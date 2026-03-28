import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { FORMS } from "@/app/form/dashboard/forms";

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

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("dash_auth")?.value;
  if (!token || token !== process.env.DASHBOARD_TOKEN) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formId = new URL(request.url).searchParams.get("formId");
  const form = FORMS.find((f) => f.id === formId);
  if (!form?.sheetId) {
    return Response.json({ error: "Unknown form" }, { status: 400 });
  }

  const url = `https://docs.google.com/spreadsheets/d/${form.sheetId}/export?format=csv&gid=${form.gid}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return Response.json({ error: "Fetch failed" }, { status: 502 });
    const csv = await res.text();
    return Response.json({ rows: parseCSV(csv) });
  } catch {
    return Response.json({ error: "Network error" }, { status: 500 });
  }
}