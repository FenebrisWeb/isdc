"use client";

import { useState } from "react";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";

const services = [
  {
    id: "height",
    number: "01",
    title: "Work at Height",
    short: "Tower Climbing & Height Safety",
    color: "#cc2128",
    href: "/services/height-safety",
    desc: "Fall protection systems, anchor point selection, harness inspection, rescue procedures, and scaffold safety. Gravity-certified trainers with field exposure across construction, power, and telecom.",
    tags: ["Fall Protection", "Rescue", "Scaffold Safety", "Tower Climbing"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 3L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
      </svg>
    ),
  },
  {
    id: "fire",
    number: "02",
    title: "Fire Safety",
    short: "Training & Audit",
    color: "#fe5a0e",
    href: "/services/fire-safety",
    desc: "Basic (1-day) and Advanced (2-day) certified fire safety training. Covers fire classification, extinguisher selection, emergency evacuation, and systematic fire risk audits for all premises.",
    tags: ["Basic Level", "Advanced Level", "Fire Audit", "Evacuation"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    id: "firstaid",
    number: "03",
    title: "First Aid",
    short: "Occupational Health",
    color: "#257e43",
    href: "/services/first-aid",
    desc: "Immediate response training for workplace, road, and home accidents. Delivered by WHO-certified doctors. Covers minor accidents to severe emergencies with practical hands-on sessions.",
    tags: ["WHO Certified", "Workplace", "Emergency Response", "Hands-On"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "scaffolding",
    number: "04",
    title: "Scaffolding",
    short: "Erection & Dismantling",
    color: "#1a7a8a",
    href: "/services/scaffolding",
    desc: "Hands-on training for safe erection, inspection, and dismantling of scaffolding structures. Covers load calculations, stability, access and egress, and compliance with scaffold safety standards.",
    tags: ["Erection", "Inspection", "Dismantling", "Load Safety"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M6.75 3v18M17.25 3v18M3 7.5h18M3 12h18M3 16.5h18" />
      </svg>
    ),
  },
  {
    id: "confined",
    number: "05",
    title: "Confined Space",
    short: "Entry & Rescue",
    color: "#cc2128",
    href: "/services/confined-space",
    desc: "Confined space hazard recognition, atmospheric testing, permit-to-work systems, entrant and attendant roles, and rescue procedures. Critical for oil & gas, chemical, and utility sectors.",
    tags: ["Hazard Recognition", "Permit-to-Work", "Atmospheric Testing", "Rescue"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    id: "driving",
    number: "06",
    title: "Defensive Driving",
    short: "Road Safety Training",
    color: "#257e43",
    href: "/services/defensive-driving",
    desc: "Reducing motor vehicle collisions through classroom, visual, and multimedia training. Trusted by Fortune 100 corporations, SMEs, and NGOs. Lowers liability, insurance costs, and repair expenses.",
    tags: ["Road Safety", "Fleet Training", "Multimedia", "Compliance"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    id: "behaviour",
    number: "07",
    title: "Behaviour Based Safety",
    short: "BBS Training",
    color: "#fe5a0e",
    href: "/complete-EHS-services-Package",
    desc: "80% of accidents stem from unsafe behaviour. ISDC's Basic and Advanced BBS programmes build hazard recognition skills, safety motivation, and a positive safety culture. International certification awarded.",
    tags: ["Internationally Certified", "Basic & Advanced", "Safety Culture", "Customised"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: "ergonomics",
    number: "08",
    title: "Ergonomics & Wellness",
    short: "Occupational Health",
    color: "#1a7a8a",
    href: "/complete-EHS-services-Package",
    desc: "Industrial and office ergonomics addressing musculoskeletal injuries, fatigue, and stress. Includes course manuals, case study exercises, and no-cost/low-cost solution frameworks.",
    tags: ["Industrial", "Office", "Stress Management", "Low-Cost Solutions"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
];

const stats = [
  {
    value: "10,000+", label: "Professionals Trained", color: "#cc2128",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    value: "200+", label: "Regular Clients", color: "#257e43",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
  {
    value: "1,50,000+", label: "Training Sessions", color: "#fe5a0e",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    value: "15+", label: "Years of Excellence", color: "#1a7a8a",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
  },
];

export default function EHSPackageOverview() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <>
      {/* ── INTRO with stats ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-14 lg:gap-20 items-start">

            <AnimateOnScroll animation="fadeRight">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-primary" />
                <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Why Choose ISDC</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-dark leading-[1.08] tracking-tight mb-6">
                A One-Stop <span className="text-primary">EHS Solution</span> for Every Industry
              </h2>
              <p className="text-dark text-sm leading-relaxed mb-4">
                ISDC provides quality, state-of-the-art EHS services to emerged and emerging construction projects and industrial operations across India and abroad — from mining, metal, chemical, pharmaceuticals, petrochemicals, and oil & gas to power, atomic plants, and high-tech installations.
              </p>
              <p className="text-dark text-sm leading-relaxed mb-4">
                Our training programmes enable you to obtain and maintain certification for state, central and local regulatory compliance. We offer a comprehensive range of strategic, management and technical consulting — assessment, compliance, risk management, reporting, training, and communication — partnering with clients on both short-term needs and long-term sustainability goals.
              </p>
              <p className="text-dark text-sm leading-relaxed mb-8">
                ISDC is a growth partnership company helping clients achieve transformational growth through holistic EHS solutions. Our highly-skilled consultants deliver on-site support to supplement existing staff or lead new initiatives — without the need for permanent headcount.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Get a Free Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </AnimateOnScroll>

            {/* stats + industries */}
            <AnimateOnScroll animation="fadeLeft" delay={80} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-5 shadow-sm group hover:shadow-md transition-shadow duration-200">
                    {/* colored left accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl" style={{ background: s.color }} />
                    {/* faint ghost number */}
                    <div className="absolute -bottom-3 -right-1 text-[3.5rem] font-black leading-none select-none pointer-events-none" style={{ color: s.color, opacity: 0.06 }}>
                      {s.value}
                    </div>
                    {/* icon badge */}
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-3" style={{ background: `${s.color}15`, color: s.color }}>
                      {s.icon}
                    </div>
                    <p className="font-black text-2xl sm:text-3xl tracking-tight leading-none relative" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-dark text-[10px] font-bold uppercase tracking-widest mt-1.5 relative leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <p className="text-dark text-xs font-bold uppercase tracking-widest mb-3">Industries Served</p>
                <div className="flex flex-wrap gap-2">
                  {["Mining & Metals","Chemical & Pharma","Petrochemicals","Oil & Gas","Fertilizer","Power & Utilities","Atomic Power","Construction","Telecom","Manufacturing","Government","Consumer Goods"].map((ind) => (
                    <span key={ind} className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-gray-200 text-dark">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </section>

      {/* ── SERVICES interactive list ── */}
      <section className="py-20 lg:py-28 overflow-hidden" style={{ background: "#101a2e" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 56px)" }} />

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateOnScroll animation="fadeUp" className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-accent" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">All Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white leading-[1.08] tracking-tight">
              Training <span className="text-primary">Programmes</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

            {/* list */}
            <div className="flex flex-col">
              {services.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(i)}
                    className="group text-left flex items-center gap-5 py-4 border-b border-white/[0.06] hover:border-white/15 cursor-pointer transition-all duration-200"
                    style={isActive ? { borderBottomColor: "rgba(255,255,255,0.2)" } : {}}
                  >
                    <span
                      className="text-[10px] font-black tracking-widest text-white/25 flex-shrink-0 mt-0.5 w-5 transition-colors duration-200 group-hover:text-white/50"
                      style={isActive ? { color: "#cc2128" } : {}}
                    >
                      {s.number}
                    </span>
                    <span
                      className="flex-1 text-base font-black tracking-tight text-white/50 transition-colors duration-200 group-hover:text-white/80"
                      style={isActive ? { color: "#fff" } : {}}
                    >
                      {s.title}
                      <span
                        className="ml-2 text-xs font-semibold text-white/20 transition-colors duration-200"
                        style={isActive ? { color: "rgba(255,255,255,0.5)" } : {}}
                      >
                        {s.short}
                      </span>
                    </span>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-white/5 transition-all duration-200 group-hover:bg-white/10"
                      style={isActive ? { background: "#cc2128" } : {}}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* detail panel */}
            <div className="lg:sticky lg:top-28 self-start">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 overflow-hidden relative">
                {/* color blob */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${current.color}30 0%, transparent 70%)` }} />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${current.color}20`, color: current.color }}>
                    {current.icon}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: current.color }}>
                    {current.number}
                  </span>
                  <h3 className="text-white font-black text-xl mt-1 mb-1">{current.title}</h3>
                  <p className="text-sm font-semibold mb-4" style={{ color: current.color }}>{current.short}</p>
                  <p className="text-white text-sm leading-relaxed mb-5">{current.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {current.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full border border-white/10 text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={current.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white border border-white/15 px-4 py-2 rounded-full hover:bg-white hover:text-dark transition-all duration-200"
                  >
                    Learn More
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
