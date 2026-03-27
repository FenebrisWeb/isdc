import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";
import Link from "next/link";

const statColors = ["#cc2128", "#257e43", "#fe5a0e", "#1a7a8a"];

export interface ServiceModule {
  title: string;
  desc: string;
}

export interface ServiceDetailData {
  intro: string;
  stats: { value: string; label: string }[];
  modules: ServiceModule[];
  audience: string[];
  benefits: string[];
  certText: string;
}

export default function ServiceDetail({ data }: { data: ServiceDetailData }) {
  const { intro, stats, modules, audience, benefits, certText } = data;

  return (
    <>
      {/* Intro + Stats */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateOnScroll animation="fadeUp" className="max-w-3xl mb-14">
            <p className="text-dark text-base leading-relaxed">{intro}</p>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <AnimateOnScroll key={s.label} animation="scaleIn" delay={i * 60}>
                <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                    style={{ background: statColors[i] }}
                  />
                  <div
                    className="absolute -bottom-3 -right-1 text-[3.5rem] font-black leading-none select-none pointer-events-none"
                    style={{ color: statColors[i], opacity: 0.06 }}
                  >
                    {s.value}
                  </div>
                  <p
                    className="font-black text-2xl sm:text-3xl tracking-tight leading-none relative"
                    style={{ color: statColors[i] }}
                  >
                    {s.value}
                  </p>
                  <p className="text-dark text-[10px] font-bold uppercase tracking-widest mt-2 relative leading-snug">
                    {s.label}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Course Modules + Side Panel */}
      <section className="py-20 lg:py-28" style={{ background: "#080C18" }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateOnScroll animation="fadeUp" className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-accent" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Course Curriculum</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              What You Will <span className="text-primary">Learn</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
            {/* Modules list */}
            <div className="space-y-3">
              {modules.map((m, i) => (
                <AnimateOnScroll key={i} animation="fadeRight" delay={i * 40}>
                  <div className="flex gap-5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-200">
                    <span className="text-[10px] font-black tracking-widest text-primary/60 flex-shrink-0 mt-0.5 w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-white font-black text-sm mb-1">{m.title}</p>
                      <p className="text-white/60 text-xs leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Sticky side panel */}
            <AnimateOnScroll
              animation="fadeLeft"
              delay={100}
              className="lg:sticky lg:top-28 self-start space-y-4"
            >
              {/* Who Should Attend */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-white font-black text-sm mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full bg-secondary inline-block" />
                  Who Should Attend
                </p>
                <div className="space-y-2.5">
                  {audience.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 text-white/70 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-1" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-white font-black text-sm mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full bg-accent inline-block" />
                  Key Benefits
                </p>
                <div className="space-y-2.5">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3 text-white/70 text-xs">
                      <svg
                        className="w-3 h-3 text-accent flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certification + Enroll CTA */}
              <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6">
                <p className="text-white font-black text-sm mb-2">Certification</p>
                <p className="text-white/70 text-xs leading-relaxed mb-4">{certText}</p>
                <Link
                  href="/contact"
                  className="block text-center text-sm font-bold text-white bg-primary px-5 py-2.5 rounded-full hover:bg-red-700 transition-colors"
                >
                  Enroll Now
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
