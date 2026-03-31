import Link from "next/link";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";

const recruitmentItems = [
  { icon: "01", text: "Organising interviews and scrutinising candidates by EHS professionals as per client job requirements" },
  { icon: "02", text: "Need-based training provided to all associated candidates as EHS technical specialists" },
  { icon: "03", text: "Immediate replacements available for long leave, urgent resignation, or termination" },
  { icon: "04", text: "All HR legal compliances — Personal Accident Policy and Medical Insurance — handled by ISDC" },
  { icon: "05", text: "Ensuring all deployed employees comply with client HR and leave policies" },
  { icon: "06", text: "Monthly attendance and leave records maintained; short and long-term staffing available" },
  { icon: "07", text: "On-call for emergency and shutdown situations; all site professionals monitored by senior HSE experts" },
];

const constructionSteps = [
  { label: "HSE Professionals", sub: "24×7 deployment", color: "#cc2128" },
  { label: "Office Setup", sub: "Fully equipped", color: "#257e43" },
  { label: "Accommodation", sub: "& Transportation", color: "#fe5a0e" },
  { label: "Legal Compliance", sub: "All statutory", color: "#1a7a8a" },
  { label: "Document Preparation", sub: "Reports & review", color: "#cc2128" },
  { label: "Statutory Compliance", sub: "All requirements", color: "#257e43" },
  { label: "Safety Audit & Training", sub: "On-site delivery", color: "#fe5a0e" },
  { label: "Safety Meetings", sub: "Management level", color: "#1a7a8a" },
  { label: "PPE Compliance", sub: "Full enforcement", color: "#cc2128" },
  { label: "Accident Reporting", sub: "& Investigation", color: "#257e43" },
  { label: "Incident-Free Sites", sub: "Zero tolerance", color: "#fe5a0e" },
  { label: "Daily Unsafe Reports", sub: "Condition & act", color: "#1a7a8a" },
];

export default function Outsourcing() {
  return (
    <>
      {/* ── OUTSOURCING ── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

          <AnimateOnScroll animation="fadeUp" className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-secondary" />
              <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em]">Staffing Solutions</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-dark leading-[1.08] tracking-tight max-w-xl">
                EHS &amp; Fire Professional <span className="text-primary">Outsourcing</span>
              </h2>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-gray-200 text-dark text-sm font-bold px-5 py-2.5 rounded-full hover:border-primary hover:text-primary transition-colors flex-shrink-0 self-start">
                Request Staff
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* left — intro */}
            <AnimateOnScroll animation="fadeRight">
              <div className="bg-white rounded-2xl border border-gray-100 p-8 h-full shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h3 className="text-dark font-black text-xl mb-3">Dedicated EHS Manpower</h3>
                <p className="text-dark text-sm leading-relaxed mb-5">
                  ISDC is the reputed organisation in India exclusively dedicated to recruiting EHS professionals for safety jobs across the country. We meet safety manpower supply at all levels of management — from Stewards to Safety Head — for all industries.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {["Steward to Safety Head", "All Industries", "Short & Long Term", "Emergency On-Call"].map((tag, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-dark">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            {/* right — recruitment list */}
            <AnimateOnScroll animation="fadeLeft" delay={80}>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <p className="text-dark font-black text-base mb-5 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-secondary inline-block" />
                  Inclusive Recruitment Management
                </p>
                <div className="space-y-3">
                  {recruitmentItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="text-[10px] font-black text-primary/60 mt-0.5 flex-shrink-0 w-5">{item.icon}</span>
                      <p className="text-dark text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </section>

      {/* ── CONSTRUCTION PACKAGE ── */}
      <section className="py-20 lg:py-28 overflow-hidden" style={{ background: "#101a2e" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 56px)" }} />

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateOnScroll animation="fadeUp" className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-accent" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Complete Package</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:justify-between">
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white leading-[1.08] tracking-tight max-w-xl">
                EHS Package for <span className="text-primary">Construction Sites</span>
              </h2>
              <p className="text-white text-sm max-w-xs sm:text-right leading-relaxed">
                A fully managed, end-to-end EHS solution covering every aspect of site safety.
              </p>
            </div>
          </AnimateOnScroll>

          {/* flow grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
            {constructionSteps.map((step, i) => (
              <AnimateOnScroll key={i} animation="scaleIn" delay={i * 35}>
                <div className="relative group rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 hover:bg-white/[0.07] hover:border-white/15 transition-all duration-300 h-full overflow-hidden">
                  {/* color top bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: step.color }} />
                  <span className="text-[10px] font-black tracking-widest mb-3 block" style={{ color: step.color }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-white font-black text-sm leading-snug">{step.label}</p>
                  <p className="text-white text-[11px] mt-1">{step.sub}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* goal banner */}
          <AnimateOnScroll animation="fadeUp" delay={200}>
            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white font-black text-lg mb-1">Zero-Incident Goal</p>
                <p className="text-white text-sm leading-relaxed">
                  All findings, unsafe conditions, and acts are reported and actioned daily. Full compliance of statutory requirements and client safety standards — ensuring accident and incident-free sites at all times.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-dark text-sm font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                Get a Quote
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimateOnScroll>

        </div>
      </section>
    </>
  );
}
