"use client";

import { useState } from "react";
import Link from "next/link";

// ── Paste your Apps Script Web App URL here when ready ──
const SHEET_URL = "https://script.google.com/macros/s/AKfycbzmm8yoaSRDsXIS9TUVnhrvMrPuBvmP1M0TtZ6dqk8Vyr2zNq46VpQdjLNJlARgwXV54Q/exec";

const services = [
  "Work at Height / Tower Climbing",
  "Fire Safety Training",
  "First Aid Training",
  "Scaffolding Safety",
  "Confined Space Entry & Rescue",
  "Defensive Driving & Road Safety",
  "Behaviour Based Safety (BBS)",
  "Ergonomics & Wellness",
  "Complete EHS Services Package",
  "Fire Risk Audit",
  "EHS Consulting & Compliance",
  "Other / Not Sure",
];


interface FormData {
  name: string; email: string; phone: string; company: string;
  service: string; participants: string;
  city: string; message: string;
}

type Errors = Partial<Record<keyof FormData, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const empty: FormData = {
  name: "", email: "", phone: "", company: "",
  service: "", participants: "", city: "", message: "",
};

function validate(d: FormData): Errors {
  const e: Errors = {};
  if (!d.name.trim()) e.name = "Required";
  if (!d.email.trim()) e.email = "Required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Invalid email";
  if (!d.phone.trim()) e.phone = "Required";
  else if (!/^[+\d\s\-()]{7,15}$/.test(d.phone)) e.phone = "Invalid number";
  if (!d.service) e.service = "Please select a service";
  return e;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function set(f: keyof FormData, v: string) {
    const next = { ...form, [f]: v };
    setForm(next);
    if (touched[f]) setErrors((e) => ({ ...e, [f]: validate(next)[f] ?? "" }));
  }

  function blur(f: keyof FormData) {
    setTouched((t) => ({ ...t, [f]: true }));
    setErrors((e) => ({ ...e, [f]: validate(form)[f] ?? "" }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = Object.keys(form).reduce(
      (a, k) => ({ ...a, [k]: true }),
      {}
    );
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setStatus("submitting");
    try {
      if (SHEET_URL) {
        const payload = JSON.stringify({
          ...form,
          submittedAt: new Date().toISOString(),
        });

        // Send as a query param so it survives Google's 302 POST→GET redirect
        const url = `${SHEET_URL}?data=${encodeURIComponent(payload)}`;

        await fetch(url, { method: "GET", mode: "no-cors" });
      } else {
        await new Promise((r) => setTimeout(r, 1400));
      }
      setStatus("success");
      setForm(empty);
      setTouched({});
    } catch {
      setStatus("error");
    }
  }

  const inp = (f: keyof FormData) => ({
    value: form[f],
    onChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => set(f, ev.target.value),
    onBlur: () => blur(f),
  });

  const hasErr = (f: keyof FormData): boolean => !!(touched[f] && errors[f]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ══════════════════════════════════════════════════
          LEFT PANEL — dark brand column
      ══════════════════════════════════════════════════ */}
      <div
        className="relative lg:w-[42%] xl:w-[38%] flex-shrink-0 flex flex-col justify-between overflow-hidden"
        style={{ background: "#080C18", minHeight: "clamp(400px, 100vh, 9999px)" }}
      >
        {/* decorative grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.013) 0px, rgba(255,255,255,0.013) 1px, transparent 1px, transparent 56px)" }} />
        {/* red glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(204,33,40,0.18) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,126,67,0.10) 0%, transparent 70%)" }} />
        {/* corner brackets */}
        <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-primary/50 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-primary/50 pointer-events-none" />

        <div className="relative z-10 p-8 sm:p-10 lg:p-12 flex flex-col gap-10 h-full">

          {/* breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/30 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">Contact</span>
          </div>

          {/* headline */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-primary" />
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.25em]">Get in Touch</span>
            </div>
            <h1 className="text-3xl sm:text-4xl xl:text-[2.6rem] font-black text-white leading-[1.1] tracking-tight">
              Let&apos;s Build a<br />
              <span className="text-primary">Safer Workplace</span><br />
              Together
            </h1>
            <p className="text-white/50 text-sm mt-4 leading-relaxed max-w-xs">
              Tell us your training need and our EHS experts will respond within 24 hours with a tailored proposal.
            </p>
          </div>

          {/* contact rows */}
          <div className="space-y-5">
            {[
              {
                color: "#cc2128",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />,
                label: "Call Us", value: "85272 66399", href: "tel:+918527266399",
              },
              {
                color: "#257e43",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />,
                label: "Email Us", value: "info@isdcouncil.co.in", href: "mailto:info@isdcouncil.co.in",
              },
              {
                color: "#fe5a0e",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />,
                label: "Our Office", value: "H 47 Noida Sector 63", href: "#map",
              },
            ].map((row) => (
              <a
                key={row.label}
                href={row.href}
                className="group flex items-center gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity group-hover:opacity-100 opacity-80"
                  style={{ background: `${row.color}20` }}
                >
                  <svg className="w-4 h-4" style={{ color: row.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    {row.icon}
                  </svg>
                </div>
                <div>
                  <p className="text-white/35 text-[10px] font-bold uppercase tracking-widest">{row.label}</p>
                  <p className="text-white text-sm font-semibold group-hover:text-primary transition-colors">{row.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* stat strip */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.07]">
            {[
              { value: "24 hrs", label: "Response Time" },
              { value: "15+", label: "Years Experience" },
              { value: "200+", label: "Clients Served" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-primary font-black text-lg leading-none">{s.value}</p>
                <p className="text-white/35 text-[10px] font-semibold uppercase tracking-wider mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

          {/* trust badges */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {["ISO 9001 Certified", "ISO 14001 Certified", "OHSAS 45001", "DGFASLI Approved"].map((b) => (
              <span key={b} className="text-[10px] font-bold text-white/40 border border-white/[0.08] rounded-full px-3 py-1">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          RIGHT PANEL — form
      ══════════════════════════════════════════════════ */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-6 sm:p-10 lg:p-14">
        <div className="w-full max-w-2xl">

          {status === "success" ? (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center flex flex-col items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-black text-dark mb-2">Enquiry Received!</h2>
                <p className="text-dark text-sm leading-relaxed max-w-sm mx-auto">
                  Our EHS team will review your request and reach out within 24 hours with a customised proposal.
                </p>
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm font-bold text-white bg-primary px-6 py-2.5 rounded-full hover:bg-red-700 transition-colors"
                >
                  Submit Another
                </button>
                <Link href="/" className="text-sm font-bold text-dark border border-gray-200 px-6 py-2.5 rounded-full hover:border-gray-300 transition-colors">
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              {/* form header */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-dark tracking-tight">
                  Training Enquiry Form
                </h2>
                <p className="text-dark text-sm mt-1">
                  Fields marked <span className="text-primary font-bold">*</span> are required
                </p>
              </div>

              <div className="space-y-5">

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" required error={touched.name ? errors.name : ""}>
                    <input type="text" placeholder="Rajesh Kumar" {...inp("name")}
                      className={ic(hasErr("name"))} />
                  </Field>
                  <Field label="Email Address" required error={touched.email ? errors.email : ""}>
                    <input type="email" placeholder="rajesh@company.com" {...inp("email")}
                      className={ic(hasErr("email"))} />
                  </Field>
                </div>

                {/* Phone + City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Phone Number" required error={touched.phone ? errors.phone : ""}>
                    <input type="tel" placeholder="+91 98765 43210" {...inp("phone")}
                      className={ic(hasErr("phone"))} />
                  </Field>
                  <Field label="City / Location">
                    <input type="text" placeholder="Delhi, Noida, Mumbai..." {...inp("city")}
                      className={ic(false)} />
                  </Field>
                </div>

                {/* Company */}
                <Field label="Company / Organisation">
                  <input type="text" placeholder="ABC Constructions Ltd." {...inp("company")}
                    className={ic(false)} />
                </Field>

                {/* Service + Participants */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Service Required" required error={touched.service ? errors.service : ""}>
                    <select {...inp("service")} className={ic(hasErr("service"))}>
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="No. of Participants">
                    <input type="number" min="1" placeholder="e.g. 25" {...inp("participants")}
                      className={ic(false)} />
                  </Field>
                </div>

                {/* Message */}
                <Field label="Additional Requirements">
                  <textarea rows={4} placeholder="Preferred dates, on-site requirements, specific topics, or any other details..." {...inp("message")}
                    className={`${ic(false)} resize-none`} />
                </Field>

                {status === "error" && (
                  <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    Something went wrong. Please try again or call us directly.
                  </div>
                )}

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 bg-primary text-white text-sm font-black py-4 px-10 rounded-full hover:bg-red-700 transition-all shadow-xl shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-primary/40 hover:scale-[1.02] active:scale-100"
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Send Enquiry
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-dark/100 text-center sm:text-left leading-relaxed">
                    We respect your privacy and will never share your data with third parties.
                  </p>
                </div>

              </div>
            </form>
          )}
        </div>
      </div>

    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────── */

function ic(err: boolean) {
  return `w-full px-4 py-3 rounded-xl border text-dark text-sm placeholder-gray-400 bg-white focus:outline-none focus:ring-2 transition-all ${
    err
      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
      : "border-gray-200 focus:border-primary focus:ring-primary/10 hover:border-gray-300"
  }`;
}

function Field({
  label, required, error, children,
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-black text-dark uppercase tracking-widest">
        {label}{required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-red-500 text-[11px] font-medium">
          <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
