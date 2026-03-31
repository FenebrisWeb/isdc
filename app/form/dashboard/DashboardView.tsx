"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────────────────────

interface FormOption { id: string; label: string; }

interface Submission {
  submittedAt: string; name: string; email: string; phone: string;
  company: string; service: string; participants: string; city: string;
  message: string; source: string;
  [key: string]: string | undefined;
}

type ModalFields = {
  name: string; email: string; phone: string;
  company: string; service: string; city: string; message: string;
};

type DateRange   = "all" | "today" | "week" | "month";
type SortDir     = "asc" | "desc";
type SourceFilter = "all" | "whatsapp" | "contact";

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

const SERVICES = [
  "Work at Height / Tower Climbing", "Fire Safety Training", "First Aid Training",
  "Scaffolding Safety", "Confined Space Entry & Rescue", "Defensive Driving & Road Safety",
  "Behaviour Based Safety (BBS)", "Complete EHS Services Package", "Fire Risk Audit",
  "EHS Consulting & Compliance", "Other / Not Sure",
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function isWA(sub: Submission): boolean {
  return sub.name.startsWith("🟢") || sub.source === "WhatsApp Widget";
}

function displayName(sub: Submission): string {
  return sub.name.startsWith("🟢") ? sub.name.slice(2).trim() : sub.name;
}

function subKey(sub: Submission): string {
  return `${sub.submittedAt}::${sub.name}`;
}

function parseRows(rows: string[][] | null): Submission[] {
  if (!rows || rows.length < 2) return [];
  const headers = rows[0].map((h) => h.toLowerCase().trim());

  function col(...candidates: string[]): number {
    for (const c of candidates) { const i = headers.indexOf(c); if (i !== -1) return i; }
    return -1;
  }

  const idx = {
    submittedAt:  col("submittedat", "timestamp", "date", "submitted at", "submitted_at", "time"),
    name:         col("name", "full name", "fullname", "full_name"),
    email:        col("email", "email address", "emailaddress", "email_address"),
    phone:        col("phone", "phone number", "phonenumber", "phone_number", "mobile"),
    company:      col("company", "company / organisation", "organisation", "organization", "company/organisation"),
    service:      col("service", "service required", "servicerequired", "service_required"),
    participants: col("participants", "no. of participants", "noofparticipants", "num_participants"),
    city:         col("city", "city / location", "location", "city/location"),
    message:      col("message", "additional requirements", "additionalrequirements", "notes"),
    source:       col("source", "source_type", "sourcetype"),
  };

  return rows.slice(1).map((row) =>
    Object.fromEntries(Object.entries(idx).map(([k, i]) => [k, i >= 0 ? (row[i] ?? "") : ""])) as Submission
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
function isThisWeek(d: Date): boolean { return d.getTime() >= Date.now() - 7 * 86_400_000; }
function isThisMonth(d: Date): boolean {
  const n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
}
function fmtDate(s: string): string {
  const d = toDate(s);
  if (!d) return s || "—";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function downloadCSV(data: Submission[], filename: string) {
  const headers = ["Date", "Source", "Name", "Email", "Phone", "Company", "Service", "City", "Participants", "Message"];
  const csvRows = [
    headers,
    ...data.map((s) => [
      fmtDate(s.submittedAt),
      isWA(s) ? "WhatsApp" : "Contact Form",
      displayName(s), s.email, s.phone, s.company, s.service, s.city, s.participants, s.message,
    ]),
  ];
  const csv = csvRows.map((r) => r.map((v) => `"${(v || "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
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
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap"
      style={{ background: `${color}18`, color }}>
      {service || "—"}
    </span>
  );
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="text-gray-300 group-hover:text-gray-400 ml-1">↕</span>;
  return <span className="ml-1 text-primary">{dir === "asc" ? "↑" : "↓"}</span>;
}

// ── Entry Modal (Add / Edit) ───────────────────────────────────────────────────

function EntryModal({ title, initial, submitting, onSave, onClose }: {
  title: string; initial: ModalFields; submitting: boolean;
  onSave: (f: ModalFields) => void; onClose: () => void;
}) {
  const [f, setF] = useState<ModalFields>(initial);
  const set = (k: keyof ModalFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setF((p) => ({ ...p, [k]: e.target.value }));

  const inp = "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all";

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white w-full sm:w-[480px] sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0" style={{ background: "#101a2e" }}>
          <p className="text-white font-bold text-sm">{title}</p>
          <button onClick={onClose} className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Name *</label>
              <input className={inp} value={f.name} onChange={set("name")} placeholder="Full name" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Phone</label>
              <input className={inp} value={f.phone} onChange={set("phone")} placeholder="+91 XXXXX XXXXX" />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email</label>
              <input type="email" className={inp} value={f.email} onChange={set("email")} placeholder="email@example.com" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Company</label>
              <input className={inp} value={f.company} onChange={set("company")} placeholder="Company name" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">City</label>
              <input className={inp} value={f.city} onChange={set("city")} placeholder="City" />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Service</label>
              <select className={inp} value={f.service} onChange={set("service")}>
                <option value="">Select service</option>
                {SERVICES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Notes</label>
              <textarea rows={3} className={`${inp} resize-none`} value={f.message} onChange={set("message")} placeholder="Additional notes…" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-5 py-4 border-t border-gray-100 flex-shrink-0 bg-gray-50/50">
          <button onClick={onClose} className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button onClick={() => { if (f.name.trim()) onSave(f); }} disabled={submitting || !f.name.trim()}
            className="flex-1 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "#101a2e" }}>
            {submitting ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete confirm ─────────────────────────────────────────────────────────────

function DeleteConfirm({ name, onConfirm, onClose }: { name: string; onConfirm: () => void; onClose: () => void; }) {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </div>
        <p className="text-center font-bold text-gray-800 text-sm mb-1">Remove this entry?</p>
        <p className="text-center text-gray-400 text-xs mb-5">
          <span className="font-semibold text-gray-700">{name}</span> will be hidden from this view.<br />
          <span className="text-gray-300 text-[10px]">Does not delete from Google Sheet</span>
        </p>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-sm font-bold text-white hover:bg-red-600 transition-colors">Remove</button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function DashboardView({ forms, initialRows }: { forms: FormOption[]; initialRows: string[][] | null; }) {
  const router = useRouter();

  // ── Core state ───────────────────────────────────────────────────────────────
  const [selectedId, setSelectedId]       = useState(forms[0]?.id ?? "");
  const [rows, setRows]                   = useState<string[][] | null>(initialRows);
  const [fetching, setFetching]           = useState(false);
  const [fetchError, setFetchError]       = useState(false);

  // ── Filter / sort state ──────────────────────────────────────────────────────
  const [search, setSearch]               = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [sourceFilter, setSourceFilter]   = useState<SourceFilter>("all");
  const [dateRange, setDateRange]         = useState<DateRange>("all");
  const [sortField, setSortField]         = useState<ColKey>("submittedAt");
  const [sortDir, setSortDir]             = useState<SortDir>("desc");
  const [expanded, setExpanded]           = useState<number | null>(null);
  const [loggingOut, setLoggingOut]       = useState(false);

  // ── CRUD state ───────────────────────────────────────────────────────────────
  const [deletedKeys, setDeletedKeys]     = useState<Set<string>>(new Set());
  const [editOverrides, setEditOverrides] = useState<Record<string, Partial<Submission>>>({});
  const [editTarget, setEditTarget]       = useState<{ key: string; fields: ModalFields } | null>(null);
  const [deleteTarget, setDeleteTarget]   = useState<{ key: string; name: string } | null>(null);
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Load localStorage on mount
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("isdc_deleted_v1") || "[]");
      setDeletedKeys(new Set(d));
      const o = JSON.parse(localStorage.getItem("isdc_overrides_v1") || "{}");
      setEditOverrides(o);
    } catch {}
  }, []);

  // ── Data fetching ────────────────────────────────────────────────────────────
  const fetchRows = useCallback(async (formId: string) => {
    setFetching(true); setFetchError(false); setExpanded(null);
    try {
      const res = await fetch(`/api/sheets?formId=${encodeURIComponent(formId)}`);
      if (!res.ok) throw new Error();
      setRows((await res.json()).rows);
    } catch { setFetchError(true); }
    finally { setFetching(false); }
  }, []);

  function handleFormChange(id: string) {
    setSelectedId(id);
    setSearch(""); setServiceFilter(""); setSourceFilter("all"); setDateRange("all");
    fetchRows(id);
  }

  // ── Derived data ─────────────────────────────────────────────────────────────
  const submissions = useMemo(() => {
    const parsed = parseRows(rows);
    return parsed
      .filter((s) => !deletedKeys.has(subKey(s)))
      .map((s) => { const ov = editOverrides[subKey(s)]; return ov ? { ...s, ...ov } : s; });
  }, [rows, deletedKeys, editOverrides]);

  const todayCount = useMemo(() => submissions.filter((s) => { const d = toDate(s.submittedAt); return d ? isToday(d) : false; }).length, [submissions]);
  const weekCount  = useMemo(() => submissions.filter((s) => { const d = toDate(s.submittedAt); return d ? isThisWeek(d) : false; }).length, [submissions]);
  const waCount    = useMemo(() => submissions.filter(isWA).length, [submissions]);
  const allServices = useMemo(() => [...new Set(submissions.map((s) => s.service).filter(Boolean))].sort(), [submissions]);

  const filtered = useMemo(() => {
    let result = submissions.filter((s) => {
      if (dateRange !== "all") {
        const d = toDate(s.submittedAt);
        if (!d) return false;
        if (dateRange === "today" && !isToday(d))    return false;
        if (dateRange === "week"  && !isThisWeek(d)) return false;
        if (dateRange === "month" && !isThisMonth(d)) return false;
      }
      if (sourceFilter === "whatsapp" && !isWA(s)) return false;
      if (sourceFilter === "contact"  && isWA(s))  return false;
      if (search) {
        const q = search.toLowerCase();
        if (![displayName(s), s.email, s.company, s.city, s.service, s.phone].some((v) => v.toLowerCase().includes(q))) return false;
      }
      if (serviceFilter && s.service !== serviceFilter) return false;
      return true;
    });

    return [...result].sort((a, b) => {
      if (sortField === "submittedAt") {
        const da = toDate(a.submittedAt)?.getTime() ?? 0;
        const db = toDate(b.submittedAt)?.getTime() ?? 0;
        return sortDir === "asc" ? da - db : db - da;
      }
      const av = (sortField === "name" ? displayName(a) : a[sortField] ?? "").toLowerCase();
      const bv = (sortField === "name" ? displayName(b) : b[sortField] ?? "").toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [submissions, search, serviceFilter, sourceFilter, dateRange, sortField, sortDir]);

  // ── CRUD handlers ─────────────────────────────────────────────────────────────
  function confirmDelete() {
    if (!deleteTarget) return;
    const next = new Set(deletedKeys).add(deleteTarget.key);
    setDeletedKeys(next);
    localStorage.setItem("isdc_deleted_v1", JSON.stringify([...next]));
    setDeleteTarget(null); setExpanded(null);
  }

  function saveEdit(fields: ModalFields) {
    if (!editTarget) return;
    setEditSubmitting(true);
    const next = { ...editOverrides, [editTarget.key]: { ...fields } };
    setEditOverrides(next);
    localStorage.setItem("isdc_overrides_v1", JSON.stringify(next));
    setEditSubmitting(false); setEditTarget(null);
  }

  function handleSort(key: ColKey) {
    if (sortField === key) { setSortDir((d) => (d === "asc" ? "desc" : "asc")); }
    else { setSortField(key); setSortDir(key === "submittedAt" ? "desc" : "asc"); }
  }

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/dashboard", { method: "DELETE" });
    router.refresh();
  }

  function handleDownload() {
    const date = new Date().toISOString().slice(0, 10);
    const tag = sourceFilter !== "all" ? `-${sourceFilter}` : "";
    downloadCSV(filtered, `isdc-submissions${tag}-${date}.csv`);
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Modals */}
      {editTarget   && <EntryModal title="Edit Entry" initial={editTarget.fields} submitting={editSubmitting} onSave={saveEdit} onClose={() => setEditTarget(null)} />}
      {deleteTarget && <DeleteConfirm name={deleteTarget.name} onConfirm={confirmDelete} onClose={() => setDeleteTarget(null)} />}

      {/* ── Header ────────────────────────────────────────────────────────────── */}
      <div style={{ background: "#101a2e" }} className="border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-2">

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

          {/* Right-side actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 overflow-x-auto [&::-webkit-scrollbar]:hidden">

            {/* Form Selector */}
            <div className="relative flex-shrink-0">
              <select value={selectedId} onChange={(e) => handleFormChange(e.target.value)} disabled={fetching}
                className="appearance-none bg-white/[0.07] border border-white/[0.12] text-white text-xs font-semibold rounded-lg pl-3 pr-7 py-1.5 focus:outline-none focus:border-primary/60 transition-colors cursor-pointer disabled:opacity-50 max-w-[130px] sm:max-w-none truncate">
                {forms.map((f) => <option key={f.id} value={f.id} style={{ background: "#1a1a2e" }}>{f.label}</option>)}
              </select>
              <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            <div className="h-5 w-px bg-white/10 flex-shrink-0" />

            {/* CSV */}
            <button onClick={handleDownload} disabled={filtered.length === 0} title="Download CSV"
              className="flex items-center gap-1 text-white/40 hover:text-white text-xs font-semibold transition-colors disabled:opacity-30 flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span className="hidden sm:inline">CSV</span>
            </button>

            <div className="h-5 w-px bg-white/10 flex-shrink-0" />

            {/* Refresh */}
            <button onClick={() => fetchRows(selectedId)} disabled={fetching} title="Refresh"
              className="flex items-center gap-1 text-white/40 hover:text-white text-xs font-semibold transition-colors disabled:opacity-30 flex-shrink-0">
              <svg className={`w-4 h-4 ${fetching ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span className="hidden sm:inline">{fetching ? "Loading…" : "Refresh"}</span>
            </button>

            <div className="h-5 w-px bg-white/10 flex-shrink-0" />

            {/* Logout */}
            <button onClick={handleLogout} disabled={loggingOut} title="Logout"
              className="flex items-center gap-1 text-white/40 hover:text-white text-xs font-semibold transition-colors disabled:opacity-50 flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              <span className="hidden sm:inline">{loggingOut ? "Logging out…" : "Logout"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-6">

        {/* ── Stats (4 cards) ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {[
            { label: "Total",      value: submissions.length, color: "#cc2128", bg: "rgba(204,33,40,0.08)",  waIcon: false,
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /> },
            { label: "Today",      value: todayCount,         color: "#fe5a0e", bg: "rgba(254,90,14,0.08)",  waIcon: false,
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" /> },
            { label: "This Week",  value: weekCount,          color: "#257e43", bg: "rgba(37,126,67,0.08)",  waIcon: false,
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /> },
            { label: "WhatsApp",   value: waCount,            color: "#0a5c52", bg: "rgba(10,92,82,0.08)",   waIcon: true,
              icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /> },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-5 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-tight">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-black leading-none" style={{ color: stat.color }}>{stat.value}</p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: stat.bg }}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: stat.color }}
                    fill={stat.waIcon ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke={stat.waIcon ? "none" : "currentColor"}
                    strokeWidth={1.8}>
                    {stat.icon}
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Table Card ───────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Card header / filters */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 space-y-3">

            {/* Row 1: title + date range */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-sm font-black text-dark tracking-tight">All Submissions</h2>
                <p className="text-gray-400 text-xs mt-0.5">{filtered.length} of {submissions.length} {submissions.length === 1 ? "entry" : "entries"}</p>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {(["all", "today", "week", "month"] as DateRange[]).map((r) => (
                  <button key={r} onClick={() => setDateRange(r)}
                    className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold transition-all ${dateRange === r ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                    {r === "all" ? "All" : r === "today" ? "Today" : r === "week" ? "This Week" : "Month"}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 2: Source filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Source:</span>
              {([
                { val: "all"      as SourceFilter, label: "All",           bg: "#101a2e" },
                { val: "whatsapp" as SourceFilter, label: "🟢 WhatsApp",   bg: "#0a5c52" },
                { val: "contact"  as SourceFilter, label: "📋 Contact Form", bg: "#4f46e5" },
              ]).map((opt) => (
                <button key={opt.val} onClick={() => setSourceFilter(opt.val)}
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold transition-all ${sourceFilter === opt.val ? "text-white shadow-sm" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                  style={sourceFilter === opt.val ? { background: opt.bg } : {}}>
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Row 3: search + service filter */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input type="text" placeholder="Search name, email, company, phone…"
                  value={search} onChange={(e) => { setSearch(e.target.value); setExpanded(null); }}
                  className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-dark placeholder-gray-400 bg-gray-50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 w-full transition-all" />
              </div>
              <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-dark bg-gray-50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all sm:w-56">
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
              <button onClick={() => fetchRows(selectedId)} className="text-xs text-primary underline">Try again</button>
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
              <p className="text-gray-400 text-xs mt-1 max-w-xs mx-auto">Set GOOGLE_SHEET_ID in .env.local and make the sheet publicly viewable.</p>
            </div>
          )}

          {/* Empty */}
          {!fetching && !fetchError && rows !== null && filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-gray-400 text-sm">{submissions.length === 0 ? "No submissions yet." : "No results match your filters."}</p>
              {(search || serviceFilter || dateRange !== "all" || sourceFilter !== "all") && (
                <button onClick={() => { setSearch(""); setServiceFilter(""); setDateRange("all"); setSourceFilter("all"); }}
                  className="mt-2 text-xs text-primary underline">Clear filters</button>
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
                      <th className="px-4 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <button onClick={() => handleSort("name")} className="flex items-center hover:text-dark transition-colors group">Name<SortIcon active={sortField === "name"} dir={sortDir} /></button>
                      </th>
                      <th className="px-4 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <button onClick={() => handleSort("city")} className="flex items-center hover:text-dark transition-colors group">City<SortIcon active={sortField === "city"} dir={sortDir} /></button>
                      </th>
                      <th className="px-4 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((sub, i) => {
                      const key = subKey(sub);
                      const wa = isWA(sub);
                      return (
                        <>
                          <tr key={i} className="hover:bg-gray-50/60 transition-colors cursor-pointer" onClick={() => setExpanded(expanded === i ? null : i)}>
                            <td className="px-4 py-3.5 text-gray-300 text-xs font-medium">{i + 1}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                {wa && <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black" style={{ background: "rgba(10,92,82,0.1)", color: "#0a5c52" }}>WA</span>}
                                <span className="font-semibold text-dark">{displayName(sub) || "—"}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{sub.phone || "—"}</td>
                            <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">{sub.city || "—"}</td>
                            <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-1">
                                <button title="Edit"
                                  onClick={() => setEditTarget({ key, fields: { name: displayName(sub), email: sub.email, phone: sub.phone, company: sub.company, service: sub.service, city: sub.city, message: sub.message } })}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors">
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                  </svg>
                                </button>
                                <button title="Remove"
                                  onClick={() => setDeleteTarget({ key, name: displayName(sub) })}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                  </svg>
                                </button>
                                <svg className={`w-4 h-4 text-gray-300 transition-transform cursor-pointer ${expanded === i ? "rotate-180" : ""}`}
                                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                  onClick={() => setExpanded(expanded === i ? null : i)}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                              </div>
                            </td>
                          </tr>
                          {expanded === i && (
                            <tr key={`exp-${i}`} className="bg-primary/[0.025]">
                              <td colSpan={5} className="px-8 py-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 text-sm">
                                  <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date</p><p className="text-dark">{fmtDate(sub.submittedAt)}</p></div>
                                  {sub.email   && <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email</p><a href={`mailto:${sub.email}`} className="text-primary hover:underline">{sub.email}</a></div>}
                                  {sub.company && <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Company</p><p className="text-dark">{sub.company}</p></div>}
                                  {sub.service && <div className="col-span-2 sm:col-span-1"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Service</p><ServiceBadge service={sub.service} /></div>}
                                  {sub.participants && <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Participants</p><p className="text-dark">{sub.participants}</p></div>}
                                  <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Source</p><p className="text-dark">{wa ? "WhatsApp Widget" : (sub.source || "Contact Form")}</p></div>
                                  {sub.message && <div className="col-span-2 sm:col-span-3"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Notes</p><p className="text-dark leading-relaxed">{sub.message}</p></div>}
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile / tablet cards */}
              <div className="lg:hidden divide-y divide-gray-100">
                {filtered.map((sub, i) => {
                  const key = subKey(sub);
                  const wa = isWA(sub);
                  return (
                    <div key={i} className="px-4 py-3">
                      {/* Always-visible row: Name + Phone + City + Actions */}
                      <div className="flex items-center gap-2">
                        <div className="min-w-0 flex-1 cursor-pointer" onClick={() => setExpanded(expanded === i ? null : i)}>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-gray-300 text-xs flex-shrink-0">#{i + 1}</span>
                            {wa && <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black flex-shrink-0" style={{ background: "rgba(10,92,82,0.1)", color: "#0a5c52" }}>WA</span>}
                            <p className="font-semibold text-dark text-sm truncate">{displayName(sub) || "—"}</p>
                          </div>
                          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                            {sub.phone && <span className="text-gray-500 text-xs">{sub.phone}</span>}
                            {sub.city  && <span className="text-gray-400 text-xs">{sub.city}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button onClick={() => setEditTarget({ key, fields: { name: displayName(sub), email: sub.email, phone: sub.phone, company: sub.company, service: sub.service, city: sub.city, message: sub.message } })}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                            </svg>
                          </button>
                          <button onClick={() => setDeleteTarget({ key, name: displayName(sub) })}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                          <svg className={`w-4 h-4 text-gray-300 transition-transform cursor-pointer flex-shrink-0 ${expanded === i ? "rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                            onClick={() => setExpanded(expanded === i ? null : i)}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                      </div>

                      {/* Expanded: all other info */}
                      {expanded === i && (
                        <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                          <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Date</p><p className="text-dark text-xs">{fmtDate(sub.submittedAt)}</p></div>
                          {sub.email   && <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Email</p><a href={`mailto:${sub.email}`} className="text-primary hover:underline text-xs">{sub.email}</a></div>}
                          {sub.company && <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Company</p><p className="text-dark text-xs">{sub.company}</p></div>}
                          {sub.service && <div className="col-span-2"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Service</p><ServiceBadge service={sub.service} /></div>}
                          {sub.participants && <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Participants</p><p className="text-dark text-xs">{sub.participants}</p></div>}
                          <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Source</p><p className="text-dark text-xs">{wa ? "WhatsApp Widget" : (sub.source || "Contact Form")}</p></div>
                          {sub.message && <div className="col-span-2"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Notes</p><p className="text-dark text-xs leading-relaxed">{sub.message}</p></div>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Footer */}
          {!fetching && filtered.length > 0 && (
            <div className="px-4 sm:px-6 py-3 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-xs text-gray-400">
                {filtered.length} of {submissions.length} {submissions.length === 1 ? "submission" : "submissions"}
                {sourceFilter !== "all" ? ` · ${sourceFilter === "whatsapp" ? "🟢 WhatsApp" : "📋 Contact Form"} only` : ""}
                {serviceFilter ? ` · "${serviceFilter}"` : ""}
                {search ? ` · "${search}"` : ""}
              </p>
              <button onClick={handleDownload} disabled={filtered.length === 0}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-dark font-semibold transition-colors disabled:opacity-30 self-start sm:self-auto">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download {filtered.length} rows as CSV
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}