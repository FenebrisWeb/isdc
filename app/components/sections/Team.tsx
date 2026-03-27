"use client";

import { useRef, useState } from "react";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";

const team = [
  {
    name: "Raju Pandit",
    role: "Height & Safety Trainer",
    credentials: "Gravity Certified",
    avatarColor: "#cc2128",
    accentLight: "rgba(204,33,40,0.14)",
    shortBio: "Specialist trainer for working-at-height safety. Covers fall protection, harness inspection, rescue procedures, and scaffold safety across construction, power, and telecom sectors.",
    fullBio:
      "Raju Pandit is ISDC's specialist trainer for working-at-height safety, holding a Gravity certification that places him among a select group of rigorously qualified height-safety professionals in India. His training programs cover fall protection systems, anchor point selection, harness inspection, rescue procedures, and ladder & scaffold safety. With extensive field exposure across construction, power, and telecom sectors, Raju's sessions combine deep technical knowledge with practical on-site demonstrations that equip teams to eliminate height-related incidents.",
    social: { linkedin: "#", email: "raju@isdcouncil.com" },
  },
  {
    name: "Umesh K Purbey",
    role: "Senior EHS Expert",
    credentials: "B.E.(Mech) · M.I.Fire E (UK) · NEBOSH DIP (UK) · LA-OHSAS-18001 · LA-ISO-14001",
    avatarColor: "#257e43",
    accentLight: "rgba(37,126,67,0.14)",
    shortBio: "Member of the Institution of Fire Engineers (UK) and NEBOSH Diploma holder. Lead Auditor for OHSAS 18001 & ISO 14001 with expertise in fire engineering and process safety.",
    fullBio:
      "Umesh K Purbey brings an exceptional combination of engineering expertise and internationally recognised safety qualifications. A Member of the Institution of Fire Engineers (UK) and holder of the prestigious NEBOSH Diploma, he is a Lead Auditor for both OHSAS 18001 and ISO 14001. His post-graduate credentials in Industrial Safety and Disaster & Emergency Management allow him to deliver high-impact programs spanning fire engineering, process safety, environmental management, and emergency response planning. He has consulted for some of India's largest industrial groups.",
    social: { linkedin: "#", email: "umesh@isdcouncil.com" },
  },
  {
    name: "Mathura Prasad",
    role: "EHS Expert",
    credentials: "B.E.(Electrical) · LA-OHSAS-18001 · LA-ISO-14001",
    avatarColor: "#fe5a0e",
    accentLight: "rgba(254,90,14,0.14)",
    shortBio: "Qualified electrical engineer and Lead Auditor for OHSAS 18001 & ISO 14001. Specialises in electrical safety, lockout/tagout, and hazardous energy control across manufacturing and utilities.",
    fullBio:
      "Mathura Prasad is a qualified electrical engineer and a certified Lead Auditor for OHSAS 18001 and ISO 14001, bringing a rigorous, systems-level perspective to EHS training. His electrical engineering background makes him especially effective at addressing electrical safety, lockout/tagout procedures, and hazardous energy control — critical topics across manufacturing, utilities, and infrastructure sectors. Mathura designs his programs to build genuine competency, ensuring participants can apply safety management systems on the ground and sustain compliance over the long term.",
    social: { linkedin: "#", email: "mathura@isdcouncil.com" },
  },
  {
    name: "Wing Cdr. Rakesh Parashar",
    role: "Soft Skills & Safety Trainer",
    credentials: "BA(Hons) · NEBOSH IGC · Ind. Safety Diploma · LA-OHSAS-18001",
    avatarColor: "#1a7a8a",
    accentLight: "rgba(26,122,138,0.14)",
    shortBio: "Retired Indian Air Force Wing Commander. Delivers behavioural safety, leadership, and crisis management programs backed by NEBOSH IGC and OHSAS Lead Auditor credentials.",
    fullBio:
      "A retired Wing Commander of the Indian Air Force, Rakesh Parashar combines the discipline and leadership of a decorated military career with internationally recognised safety qualifications including NEBOSH IGC and a Lead Auditor certification for OHSAS 18001. His unique background makes him an outstanding trainer for behavioural safety, leadership in safety culture, crisis management, and soft skills programs for safety professionals. He brings structure, gravitas, and clarity to every session — qualities forged over decades of high-stakes decision-making in aviation environments.",
    social: { linkedin: "#", email: "rakesh@isdcouncil.com" },
  },
];

/* ── Icons ── */
function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

const GAP = 16;

export default function Team() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [modal, setModal]   = useState<number | null>(null);

  const slide = (dir: 1 | -1) => {
    const wrapper = wrapperRef.current;
    const track   = trackRef.current;
    if (!wrapper || !track) return;
    const card = track.querySelector("[data-card]") as HTMLElement | null;
    if (!card) return;
    const step      = card.offsetWidth + GAP;
    const maxOffset = track.scrollWidth - wrapper.offsetWidth;
    setOffset(prev => Math.max(0, Math.min(maxOffset, prev + dir * step)));
  };

  const active = modal !== null ? team[modal] : null;

  return (
    <>
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

          {/* header */}
          <AnimateOnScroll animation="fadeUp" className="flex items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-primary" />
                <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Our People</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-dark leading-[1.08] tracking-tight">
                Meet the <span className="text-primary">Team</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => slide(-1)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-dark cursor-pointer hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Previous"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => slide(1)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-dark cursor-pointer hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Next"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </AnimateOnScroll>

          {/* slider */}
          <div ref={wrapperRef} className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-4"
              style={{ transform: `translateX(-${offset}px)`, transition: "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
            >
              {team.map((member, i) => (
                <div
                  key={member.name}
                  data-card=""
                  className="flex-shrink-0 w-[78vw] sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]"
                >
                  <div className="h-full flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300">

                    {/* avatar strip */}
                    <div
                      className="relative h-52 flex items-center justify-center overflow-hidden flex-shrink-0"
                      style={{ background: `radial-gradient(ellipse at 50% 60%, ${member.accentLight} 0%, transparent 70%), linear-gradient(160deg, #f8f8fb 0%, #eef0f5 100%)` }}
                    >
                      {/* faint large initial */}
                      <span
                        className="absolute text-[7rem] font-black leading-none select-none pointer-events-none"
                        style={{ color: member.avatarColor, opacity: 0.07 }}
                      >
                        {member.name[0]}
                      </span>
                      {/* avatar circle */}
                      <div
                        className="relative w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black text-white shadow-lg ring-4 ring-white"
                        style={{ background: member.avatarColor }}
                      >
                        {member.name[0]}
                      </div>
                    </div>

                    {/* content */}
                    <div className="flex flex-col flex-1 p-5">
                      <p className="text-dark font-black text-base leading-snug">{member.name}</p>
                      <p className="text-xs font-bold mt-0.5" style={{ color: member.avatarColor }}>{member.role}</p>
                      {member.credentials && (
                        <p className="text-dark text-[11px] mt-1.5 leading-relaxed">{member.credentials}</p>
                      )}

                      <div className="h-px bg-gray-100 mt-auto mb-4" />

                      {/* social icons + view profile — same row */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {member.social.linkedin && (
                            <a
                              href={member.social.linkedin}
                              onClick={e => e.stopPropagation()}
                              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-dark hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all duration-200 cursor-pointer"
                              aria-label="LinkedIn"
                            >
                              <LinkedInIcon />
                            </a>
                          )}
                          {member.social.email && (
                            <a
                              href={`mailto:${member.social.email}`}
                              onClick={e => e.stopPropagation()}
                              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-dark hover:bg-primary hover:border-primary hover:text-white transition-all duration-200 cursor-pointer"
                              aria-label="Email"
                            >
                              <EmailIcon />
                            </a>
                          )}
                        </div>
                        <button
                          onClick={() => setModal(i)}
                          className="text-xs font-bold text-primary hover:text-accent transition-colors cursor-pointer flex-shrink-0"
                        >
                          View Profile →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* modal */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          style={{ background: "rgba(8,12,24,0.90)", backdropFilter: "blur(12px)" }}
          onClick={() => setModal(null)}
        >
          <div
            className="relative bg-[#12151f] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* close */}
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white cursor-pointer hover:border-primary hover:bg-primary transition-all duration-300 z-10"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* top image band */}
            <div
              className="relative h-36 flex items-end px-7 pb-0"
              style={{
                background: `radial-gradient(ellipse at 30% 60%, ${active.accentLight} 0%, transparent 60%), linear-gradient(135deg, #1a1a2e 0%, #0d0f1a 100%)`,
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
              />
              {/* big faint initial */}
              <span
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[7rem] font-black leading-none select-none pointer-events-none"
                style={{ color: active.avatarColor, opacity: 0.12 }}
              >
                {active.name[0]}
              </span>
              {/* avatar — overlaps band + content */}
              <div
                className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-xl ring-4 translate-y-10 flex-shrink-0"
                style={{ background: active.avatarColor }}
              >
                {active.name[0]}
              </div>
            </div>

            {/* name / role / credentials — offset to clear avatar */}
            <div className="pt-14 px-7 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-white font-black text-xl leading-snug">{active.name}</p>
              <p className="text-sm font-semibold mt-1" style={{ color: active.avatarColor }}>{active.role}</p>
              {active.credentials && (
                <p className="text-white text-[11px] font-medium mt-2 leading-relaxed tracking-wide">
                  {active.credentials}
                </p>
              )}
            </div>

            {/* bio */}
            <div className="px-7 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-white text-sm leading-relaxed">{active.fullBio}</p>
            </div>

            {/* social links */}
            <div className="px-7 py-5 flex flex-wrap gap-3">
              {active.social.linkedin && (
                <a
                  href={active.social.linkedin}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white text-xs font-semibold hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-200 cursor-pointer"
                >
                  <LinkedInIcon /> LinkedIn
                </a>
              )}

              {active.social.email && (
                <a
                  href={`mailto:${active.social.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white text-xs font-semibold hover:bg-primary hover:border-primary transition-all duration-200 cursor-pointer"
                >
                  <EmailIcon /> {active.social.email}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
