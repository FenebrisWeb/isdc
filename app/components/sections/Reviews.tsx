"use client";

import { useRef, useState } from "react";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";

const reviews = [
  {
    name: "Rajesh Kumar",
    role: "HSE Manager",
    company: "BSES Yamuna Power Ltd.",
    rating: 5,
    color: "#cc2128",
    text: "ISDC provided an exceptional complete EHS services package for our power distribution facilities. The trainers were highly knowledgeable and the programs were tailored specifically to our operational hazards. The height safety and electrical safety modules were particularly thorough, and our team came away with both theoretical knowledge and practical skills they could immediately apply on site. Compliance rates improved significantly within the first month after the program concluded.",
  },
  {
    name: "Priya Sharma",
    role: "Safety Officer",
    company: "Ashoka University",
    rating: 5,
    color: "#257e43",
    text: "The fire safety audit conducted by ISDC was incredibly detailed and professional. They identified several critical gaps in our emergency response procedures that we had completely overlooked. The subsequent training sessions for our staff were engaging and practical. Our faculty and maintenance team are now much more confident in handling fire emergencies. Highly recommend ISDC to any educational institution that is serious about campus safety.",
  },
  {
    name: "Arun Mehta",
    role: "Project Manager",
    company: "Metcon",
    rating: 5,
    color: "#fe5a0e",
    text: "We engaged ISDC for scaffolding training across our construction teams and the results exceeded expectations. The curriculum was perfectly aligned with international safety standards and the hands-on practical component was invaluable. Zero scaffolding-related incidents since the training — that speaks for itself. The trainers brought real field experience and connected genuinely well with our workers. We are already planning follow-up training for the next batch of joiners.",
  },
  {
    name: "Vikram Singh",
    role: "Fleet Safety Manager",
    company: "Exo SpaceX",
    rating: 4,
    color: "#1a7a8a",
    text: "The defensive driving program was well-structured and very relevant to our fleet operations. Our drivers appreciated the combination of classroom sessions and practical exercises on the road. Since completing the program we have seen a measurable reduction in minor incidents and near-misses across our entire fleet. The ISDC team was professional, punctual, and highly responsive to our scheduling constraints. We would definitely work with them again.",
  },
  {
    name: "Deepa Nair",
    role: "Occupational Health Lead",
    company: "Reliance Energy",
    rating: 5,
    color: "#cc2128",
    text: "ISDC's confined space training was exactly what our maintenance teams needed. The course covered all critical aspects — atmospheric testing, rescue procedures, work permit systems, and emergency protocols. The trainers were patient, thorough, and clearly passionate about safety. Our teams are now fully certified and our confined space entry procedures are robust and fully compliant. The investment in this training has already paid for itself many times over.",
  },
  {
    name: "Suresh Pillai",
    role: "Health & Safety Director",
    company: "Delhi Govt.",
    rating: 5,
    color: "#257e43",
    text: "ISDC delivered a comprehensive occupational health training program across our government facilities. The content was well-researched, current, and directly applicable to our work environment. Stress management, ergonomics, and behavioural safety sessions were particularly well received by our staff. ISDC's trainers handled a diverse audience with varying education levels exceptionally well. We have since extended the program to additional departments.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? "text-accent" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const GAP = 16; // gap-4 = 16px

export default function Reviews() {
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

  const active = modal !== null ? reviews[modal] : null;

  return (
    <>
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

          {/* header */}
          <AnimateOnScroll animation="fadeUp" className="flex items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-secondary" />
                <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em]">Testimonials</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-dark leading-[1.08] tracking-tight">
                What Our <span className="text-primary">Clients</span> Say
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
              {reviews.map((r, i) => (
                <div
                  key={r.name}
                  data-card=""
                  className="flex-shrink-0 w-[82vw] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
                >
                  <div className="h-full flex flex-col bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer">

                    {/* stars + avatar */}
                    <div className="flex items-start justify-between mb-5">
                      <Stars count={r.rating} />
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                        style={{ background: r.color }}
                      >
                        {r.name[0]}
                      </div>
                    </div>

                    {/* truncated text */}
                    <p className="text-dark text-sm leading-relaxed line-clamp-3 flex-1">
                      &ldquo;{r.text}&rdquo;
                    </p>

                    {/* read more */}
                    <button
                      onClick={() => setModal(i)}
                      className="mt-3 text-xs font-bold text-primary hover:text-accent transition-colors self-start cursor-pointer"
                    >
                      Read more →
                    </button>

                    <div className="h-px bg-gray-100 my-4" />

                    {/* reviewer */}
                    <div>
                      <p className="text-dark font-bold text-sm leading-none">{r.name}</p>
                      <p className="text-dark text-xs mt-1">{r.role}</p>
                      <p className="text-secondary text-xs font-semibold mt-0.5">{r.company}</p>
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
          style={{ background: "rgba(8,12,24,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setModal(null)}
        >
          <div
            className="relative bg-[#12151f] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white cursor-pointer hover:border-primary hover:bg-primary transition-all duration-300"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-7 sm:p-8">
              <Stars count={active.rating} />
              <p className="text-white text-sm leading-relaxed mt-5 opacity-90">
                &ldquo;{active.text}&rdquo;
              </p>
              <div className="h-px bg-white/10 my-6" />
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-base font-black text-white flex-shrink-0"
                  style={{ background: active.color }}
                >
                  {active.name[0]}
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-none">{active.name}</p>
                  <p className="text-white text-xs mt-1">{active.role}</p>
                  <p className="text-secondary text-xs font-semibold mt-0.5">{active.company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
