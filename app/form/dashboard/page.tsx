import { cookies } from "next/headers";
import LoginForm from "./LoginForm";
import DashboardView from "./DashboardView";
import { FORMS } from "./forms";

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const cells: string[] = [];
    let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
        else inQ = !inQ;
      } else if (ch === "," && !inQ) { cells.push(cur); cur = ""; }
      else cur += ch;
    }
    cells.push(cur);
    rows.push(cells);
  }
  return rows;
}

async function fetchSheetData(sheetId: string, gid: string): Promise<string[][] | null> {
  if (!sheetId) return null;
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return parseCSV(await res.text());
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const isAuthenticated =
    !!process.env.DASHBOARD_TOKEN &&
    cookieStore.get("dash_auth")?.value === process.env.DASHBOARD_TOKEN;

  if (!isAuthenticated) return <LoginForm />;

  const defaultForm = FORMS[0];
  const rows = defaultForm?.sheetId
    ? await fetchSheetData(defaultForm.sheetId, defaultForm.gid)
    : null;

  // Pass only id + label to the client — never expose sheetId
  const forms = FORMS.map((f) => ({ id: f.id, label: f.label }));

  return <DashboardView forms={forms} initialRows={rows} />;
}
