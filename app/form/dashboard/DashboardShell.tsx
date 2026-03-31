"use client";

import { useCallback, useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import DashboardView from "./DashboardView";
import { FORMS } from "./forms";

const AUTH_KEY = "isdc_dash_auth";

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

export default function DashboardShell() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [initialRows, setInitialRows] = useState<string[][] | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(AUTH_KEY);
    const expected = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD;
    const isAuthed = !!stored && !!expected && stored === expected;
    setAuthed(isAuthed);
    if (isAuthed) {
      const f = FORMS[0];
      if (f?.sheetId) {
        fetchSheetData(f.sheetId, f.gid).then(setInitialRows);
      }
    }
  }, []);

  const handleLogin = useCallback(async (password: string) => {
    sessionStorage.setItem(AUTH_KEY, password);
    setAuthed(true);
    const f = FORMS[0];
    if (f?.sheetId) {
      const rows = await fetchSheetData(f.sheetId, f.gid);
      setInitialRows(rows);
    }
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setInitialRows(null);
  }, []);

  if (authed === null) return null;

  if (!authed) return <LoginForm onLogin={handleLogin} />;

  return (
    <DashboardView
      forms={FORMS.map((f) => ({ id: f.id, label: f.label, sheetId: f.sheetId, gid: f.gid }))}
      initialRows={initialRows}
      onLogout={handleLogout}
    />
  );
}
