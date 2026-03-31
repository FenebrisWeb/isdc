"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────────────────────

interface FormOption { id: string; label: string; }

interface Submission {
  submittedAt: string; name: string; email: string; phone: string;
  company: string; service: string; participants: string; city: string; message: string;
  [key: string]: string;
}

type DateRange = "all" | "today" | "week" | "month";
type SortDir = "asc" | "desc";

const COLS = [
  { key: "submittedAt", label: "Date",    sortable: true  },
  { key: "name",        label: "Name",    sortable: true  },
  { key: "email",       label: "Email",   sortable: true  },
  { key: "phone",       label: "Phone",   sortable: false },
  { key: "company",     label: "Company", sortable: true  },
  { key: "service",     label: "Service", sortable: true  },
  { key: "city",        label: "City",    sortable: true  },
] as const;

type ColKey = typeof COLS[number]["key"];

// ── Parsers & helpers ──────────────────────────────────────────────────────────

function parseRows(rows: string[][] | null): Submission[] {
  if (!rows || rows.length < 2) return [];
  const headers = rows[0].map((h) => h.toLowerCase().trim());

  function col(...candidates: string[]): number {
    for (const c of candidates) {
      const i = headers.indexOf(c);
      if (i !== -1) return i;
    }
    return -1;
  }

  const idx = {
    submittedAt: col("submittedat", "timestamp", "date", "submitted at", "submitted_at", "time"),
    name:        col("name", "full name", "fullname", "full_name"),
    email:       col("email", "email address", "emailaddress", "email_address"),
    phone:       col("phone", "phone number", "phonenumber", "phone_number", "mobile"),
    company:     col("company", "company / organisation", "organisation", "organization", "company/organisation"),
    service:     col("service", "service required", "servicerequired", "service_required"),
    participants:col("participants", "no. of participants", "noofparticipants", "num_participants"),
    city:        col("city", "city / location", "location", "city/location"),
    message:     col("message", "additional requirements", "additionalrequirements", "notes"),
  };

  return rows.slice(1).map((row) =>
    Object.fromEntries(
      Object.entries(idx).map(([k, i]) => [k, i >= 0 ? (row[i] ?? "") : ""])
    ) as Submission
  );
}

function toDate(s: string): Date | null {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function isToday(d: Date): boolean {
  const n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
}

function isThisWeek(d: Date): boolean {
  return d.getTime() >= Date.now() - 7 * 86_400_000;
}

function isThisMonth(d: Date): boolean {
  const n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
}

function fmtDate(s: string): string {
  const d = toDate(s);
  if (!d) return s || "—";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// ── Service badge ──────────────────────────────────────────────────────────────

const SVC_COLORS: Record<string, string> = {
  "Work at Height / Tower Climbing":    "#cc2128",
  "Fire Safety Training":               "#fe5a0e",
  "First Aid Training":                 "#257e43",
  "Scaffolding Safety":                 "#7c3aed",
  "Confined Space Entry & Rescue":      "#0369a1",
  "Defensive Driving & Road Safety":    "#d97706",
  "Behaviour Based Safety (BBS)":       "#0891b2",
  "Ergonomics & Wellness":              "#16a34a",
  "Complete EHS Services Package":      "#cc2128",
  "Fire Risk Audit":                    "#fe5a0e",
  "EHS Consulting & Compliance":        "#4f46e5",
  "Other / Not Sure":                   "#6b7280",
};

function ServiceBadge({ service }: { service: string }) {
  const color = SVC_COLORS[service] ?? "#6b7280";
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap"
      style={{ background: `${color}18`, color }}
    >
      {service || "—"}
    </span>
  );
}

// ── Sort icon ──────────────────────────────────────────────────────────────────

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="text-gray-300 group-hover:text-gray-400 transition-colors ml-1">↕</span>;
  return <span className="ml-1" style={{ color: "#cc2128" }}>{dir === "asc" ? "↑" : "↓"}</span>;
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function DashboardView({
  forms,
  initialRows,
}: {
  forms: FormOption[];
  initialRows: string[][] | null;
}) {
  const router = useRouter();

  // ── State ────────────────────────────────────────────────────────────────────
  const [selectedId, setSelectedId]     = useState(forms[0]?.id ?? "");
  const [rows, setRows]                 = useState<string[][] | null>(initialRows);
  const [fetching, setFetching]         = useState(false);
  const [fetchError, setFetchError]     = useState(false);

  const [search, setSearch]             = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [dateRange, setDateRange]       = useState<DateRange>("all");
  const [sortField, setSortField]       = useState<ColKey>("submittedAt");
  const [sortDir, setSortDir]           = useState<SortDir>("desc");
  const [expanded, setExpanded]         = useState<number | null>(null);
  const [loggingOut, setLoggingOut]     = useState(false);

  // ── Data fetching ─────────────────────────────────────────────────────────────
  const fetchRows = useCallback(async (formId: string) => {
    setFetching(true);
    setFetchError(false);
    setExpanded(null);
    try {
      const res = await fetch(`/api/sheets?formId=${encodeURIComponent(formId)}`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      setRows(json.rows);
    } catch {
      setFetchError(true);
    } finally {
      setFetching(false);
    }
  }, []);

  function handleFormChange(id: string) {
    setSelectedId(id);
    setSearch("");
    setServiceFilter("");
    setDateRange("all");
    fetchRows(id);
  }

  // ── Derived data ──────────────────────────────────────────────────────────────
  const submissions = useMemo(() => parseRows(rows), [rows]);

  const todayCount = useMemo(
    () => submissions.filter((s) => { const d = toDate(s.submittedAt); return d ? isToday(d) : false; }).length,
    [submissions]
  );
  const weekCount = useMemo(
    () => submissions.filter((s) => { const d = toDate(s.submittedAt); return d ? isThisWeek(d) : false; }).length,
    [submissions]
  );

  const allServices = useMemo(
    () => [...new Set(submissions.map((s) => s.service).filter(Boolean))].sort(),
    [submissions]
  );

  const filtered = useMemo(() => {
    let result = submissions.filter((s) => {
      if (dateRange !== "all") {
        const d = toDate(s.submittedAt);
        if (!d) return false;
        if (dateRange === "today"  && !isToday(d))    return false;
        if (dateRange === "week"   && !isThisWeek(d)) return false;
        if (dateRange === "month"  && !isThisMonth(d)) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        if (![s.name, s.email, s.company, s.city, s.service, s.phone].some((v) => v.toLowerCase().includes(q)))
          return false;
      }
      if (serviceFilter && s.service !== serviceFilter) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sortField === "submittedAt") {
        const da = toDate(a.submittedAt)?.getTime() ?? 0;
        const db = toDate(b.submittedAt)?.getTime() ?? 0;
        return sortDir === "asc" ? da - db : db - da;
      }
      const av = (a[sortField] ?? "").toLowerCase();
      const bv = (b[sortField] ?? "").toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [submissions, search, serviceFilter, dateRange, sortField, sortDir]);

  // ── Sort handler ──────────────────────────────────────────────────────────────
  function handleSort(key: ColKey) {
    if (sortField === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(key);
      setSortDir(key === "submittedAt" ? "desc" : "asc");
    }
  }

  // ── Logout ────────────────────────────────────────────────────────────────────
  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/dashboard", { method: "DELETE" });
    router.refresh();
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div style={{ background: "#101a2e" }} className="border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-3">

          {/* Brand */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-black text-xs tracking-tight leading-none">ISDC Dashboard</p>
              <p className="text-white/30 text-[10px] mt-0.5 hidden sm:block">Form Submissions</p>
            </div>
          </div>

          {/* Right side: form selector + actions — always on same row */}
          <div className="flex items-center gap-2 min-w-0">

            {/* Form Selector */}
            <div className="relative min-w-0">
              <select
                value={selectedId}
                onChange={(e) => handleFormChange(e.target.value)}
                disabled={fetching}
                className="appearance-none bg-white/[0.07] border border-white/[0.12] text-white text-xs font-semibold rounded-lg pl-3 pr-7 py-1.5 focus:outline-none focus:border-primary/60 transition-colors cursor-pointer disabled:opacity-50 max-w-[160px] sm:max-w-none truncate"
              >
                {forms.map((f) => (
                  <option key={f.id} value={f.id} style={{ background: "#1a1a2e" }}>
                    {f.label}
                  </option>
                ))}
              </select>
              <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40 pointer-events-none flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            <div className="h-5 w-px bg-white/10 flex-shrink-0" />

            {/* Refresh */}
            <button
              onClick={() => fetchRows(selectedId)}
              disabled={fetching}
              title="Refresh data"
              className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-semibold transition-colors disabled:opacity-30 flex-shrink-0"
            >
              <svg className={`w-4 h-4 ${fetching ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span className="hidden sm:inline">{fetching ? "Loading…" : "Refresh"}</span>
            </button>

            <div className="h-5 w-px bg-white/10 flex-shrink-0" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              title="Logout"
              className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-semibold transition-colors disabled:opacity-50 flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              <span className="hidden sm:inline">{loggingOut ? "Logging out…" : "Logout"}</span>
            </button>

          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-6">

        {/* ── Stats (3 cards) ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {[
            {
              label: "Total Submissions", value: submissions.length,
              color: "#cc2128", bg: "rgba(204,33,40,0.08)",
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
            },
            {
              label: "Today", value: todayCount,
              color: "#fe5a0e", bg: "rgba(254,90,14,0.08)",
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />,
            },
            {
              label: "This Week", value: weekCount,
              color: "#257e43", bg: "rgba(37,126,67,0.08)",
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-5 shadow-sm">
              <div className="flex items-start justify-between gap-1.5 sm:gap-3">
                <div className="min-w-0">
                  <p className="text-[8px] sm:text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-tight">{stat.label}</p>
                  <p className="text-xl sm:text-3xl font-black leading-none" style={{ color: stat.color }}>{stat.value}</p>
                </div>
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: stat.bg }}>
                  <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" style={{ color: stat.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    {stat.icon}
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Table Card ─────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Card header */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 space-y-3">
            {/* Row 1: title + date range pills */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
              <div>
                <h2 className="text-sm font-black text-dark tracking-tight">All Submissions</h2>
                <p className="text-gray-400 text-xs mt-0.5">
                  {filtered.length} of {submissions.length} {submissions.length === 1 ? "entry" : "entries"}
                </p>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-0.5">
                {(["all", "today", "week", "month"] as DateRange[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setDateRange(r)}
                    className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      dateRange === r
                        ? "bg-primary text-white shadow-sm"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {r === "all" ? "All" : r === "today" ? "Today" : r === "week" ? "This Week" : "Month"}
                  </button>
                ))}
              </div>
            </div>
            {/* Row 2: search + service filter */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search name, email, company, phone…"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setExpanded(null); }}
                  className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-dark placeholder-gray-400 bg-gray-50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 w-full transition-all"
                />
              </div>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-dark bg-gray-50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
              >
                <option value="">All Services</option>
                {allServices.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Loading */}
          {fetching && (
            <div className="py-16 flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Loading submissions…</p>
            </div>
          )}

          {/* Error */}
          {!fetching && fetchError && (
            <div className="py-16 text-center space-y-2">
              <p className="text-red-500 text-sm font-semibold">Failed to load data</p>
              <button onClick={() => fetchRows(selectedId)} className="text-xs text-primary underline">
                Try again
              </button>
            </div>
          )}

          {/* Not configured */}
          {!fetching && !fetchError && rows === null && (
            <div className="py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-dark font-bold text-sm">Sheet not configured</p>
              <p className="text-gray-400 text-xs mt-1 max-w-xs mx-auto">
                Set GOOGLE_SHEET_ID in .env.local and make the sheet publicly viewable.
              </p>
            </div>
          )}

          {/* Empty */}
          {!fetching && !fetchError && rows !== null && filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-gray-400 text-sm">
                {submissions.length === 0 ? "No submissions yet." : "No results match your filters."}
              </p>
              {(search || serviceFilter || dateRange !== "all") && (
                <button
                  onClick={() => { setSearch(""); setServiceFilter(""); setDateRange("all"); }}
                  className="mt-2 text-xs text-primary underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* Data */}
          {!fetching && !fetchError && filtered.length > 0 && (
            <>
              {/* Desktop table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-100">
                      <th className="px-4 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-10">#</th>
                      {COLS.map((col) => (
                        <th
                          key={col.key}
                          className="px-4 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap"
                        >
                          {col.sortable ? (
                            <button
                              onClick={() => handleSort(col.key)}
                              className="flex items-center hover:text-dark transition-colors group"
                            >
                              {col.label}
                              <SortIcon active={sortField === col.key} dir={sortDir} />
                            </button>
                          ) : col.label}
                        </th>
                      ))}
                      <th className="px-4 py-3 w-8" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((sub, i) => (
                      <>
                        <tr
                          key={i}
                          className="hover:bg-gray-50/60 transition-colors cursor-pointer"
                          onClick={() => setExpanded(expanded === i ? null : i)}
                        >
                          <td className="px-4 py-3.5 text-gray-300 text-xs font-medium">{i + 1}</td>
                          <td className="px-4 py-3.5 text-gray-500 text-xs whitespace-nowrap">{fmtDate(sub.submittedAt)}</td>
                          <td className="px-4 py-3.5 font-semibold text-dark whitespace-nowrap">{sub.name || "—"}</td>
                          <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">
                            {sub.email
                              ? <a href={`mailto:${sub.email}`} className="text-primary hover:underline" onClick={(e) => e.stopPropagation()}>{sub.email}</a>
                              : "—"}
                          </td>
                          <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{sub.phone || "—"}</td>
                          <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{sub.company || "—"}</td>
                          <td className="px-4 py-3.5"><ServiceBadge service={sub.service} /></td>
                          <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">{sub.city || "—"}</td>
                          <td className="px-4 py-3.5">
                            <svg
                              className={`w-4 h-4 text-gray-400 transition-transform ${expanded === i ? "rotate-180" : ""}`}
                              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </td>
                        </tr>
                        {expanded === i && (
                          <tr key={`exp-${i}`} className="bg-primary/[0.025]">
                            <td colSpan={9} className="px-8 py-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                {sub.participants && (
                                  <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Participants</p>
                                    <p className="text-dark">{sub.participants}</p>
                                  </div>
                                )}
                                {sub.message && (
                                  <div className={sub.participants ? "" : "col-span-2"}>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Additional Requirements</p>
                                    <p className="text-dark leading-relaxed">{sub.message}</p>
                                  </div>
                                )}
                                {!sub.participants && !sub.message && (
                                  <p className="col-span-2 text-gray-400 text-xs">No additional details provided.</p>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="lg:hidden divide-y divide-gray-100">
                {filtered.map((sub, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 space-y-2 cursor-pointer hover:bg-gray-50/60 transition-colors"
                    onClick={() => setExpanded(expanded === i ? null : i)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-300 text-xs font-medium flex-shrink-0">#{i + 1}</span>
                          <p className="font-semibold text-dark text-sm truncate">{sub.name || "—"}</p>
                        </div>
                        <p className="text-gray-500 text-xs mt-0.5 truncate">{sub.email || "—"}</p>
                      </div>
                      <p className="text-[11px] text-gray-400 flex-shrink-0 mt-0.5">{fmtDate(sub.submittedAt)}</p>
                    </div>
                    {sub.service && <ServiceBadge service={sub.service} />}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                      {sub.phone && <span>{sub.phone}</span>}
                      {sub.company && <span>{sub.company}</span>}
                      {sub.city && <span>{sub.city}</span>}
                    </div>
                    {expanded === i && (sub.participants || sub.message) && (
                      <div className="mt-2 pt-3 border-t border-gray-100 space-y-2">
                        {sub.participants && (
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Participants</p>
                            <p className="text-dark text-sm">{sub.participants}</p>
                          </div>
                        )}
                        {sub.message && (
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Additional Requirements</p>
                            <p className="text-dark text-sm leading-relaxed">{sub.message}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Footer */}
          {!fetching && filtered.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <p className="text-xs text-gray-400">
                {filtered.length} of {submissions.length} {submissions.length === 1 ? "submission" : "submissions"}
                {serviceFilter ? ` · "${serviceFilter}"` : ""}
                {search ? ` · "${search}"` : ""}
              </p>
              <p className="text-xs text-gray-300">
                {COLS.find((c) => c.key === sortField)?.label} {sortDir === "asc" ? "↑" : "↓"}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
