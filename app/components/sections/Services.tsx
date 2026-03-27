import Link from "next/link";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";

const services = [
  {
    num: "01",
    title: "Height Safety",
    tagline: "Work at Height · Tower Climbing · Material Lifting",
    description:
      "Comprehensive tower climbing, work at height, and material lifting training designed for industrial professionals working in elevated environments.",
    href: "/services/height-safety",
    accent: "primary" as const,
  },
  {
    num: "02",
    title: "Fire Safety",
    tagline: "Fire Training · Risk Assessment · Emergency Drills",
    description:
      "Fire safety training and comprehensive audits to ensure your workplace meets all safety regulations and standards.",
    href: "/services/fire-safety",
    accent: "accent" as const,
  },
  {
    num: "03",
    title: "First Aid & Occupational Health",
    tagline: "First Aid · Ergonomics · Stress Management",
    description:
      "First aid certification, ergonomics assessments, behaviour-based training, and occupational health programs for total workforce wellness.",
    href: "/services/first-aid",
    accent: "secondary" as const,
  },
  {
    num: "04",
    title: "Scaffolding Training",
    tagline: "Erection · Inspection · Safe Dismantling",
    description:
      "Professional scaffolding training covering all aspects from erection to safe dismantling, aligned with international safety standards.",
    href: "/services/scaffolding",
    accent: "primary" as const,
  },
  {
    num: "05",
    title: "Confined Space Training",
    tagline: "Safe Entry · Work Permits · Rescue Procedures",
    description:
      "Specialized training for safe entry, work, and rescue operations in confined spaces — OSHA and IS compliant.",
    href: "/services/confined-space",
    accent: "secondary" as const,
  },
  {
    num: "06",
    title: "Defensive Driving",
    tagline: "Road Safety · Fleet Training · Accident Prevention",
    description:
      "Road safety and defensive driving programs that reduce fleet accidents and sharpen driver awareness on Indian roads.",
    href: "/services/defensive-driving",
    accent: "accent" as const,
  },
];

const accentMap = {
  primary:   { border: "border-primary",   bg: "hover:bg-primary/5",   icon: "bg-primary/10 text-primary",   text: "text-primary",   tag: "bg-primary/8 text-primary"   },
  secondary: { border: "border-secondary", bg: "hover:bg-secondary/5", icon: "bg-secondary/10 text-secondary", text: "text-secondary", tag: "bg-secondary/8 text-secondary" },
  accent:    { border: "border-accent",    bg: "hover:bg-accent/5",    icon: "bg-accent/10 text-accent",    text: "text-accent",    tag: "bg-accent/8 text-accent"    },
};

export default function Services() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Header ── */}
        <AnimateOnScroll animation="fadeUp" className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-secondary" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em]">What We Offer</span>
            <span className="h-px w-10 bg-secondary" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-dark leading-[1.08] tracking-tight">
            Training &amp;{" "}
            <span className="text-primary">Safety</span> Services
          </h2>
        </AnimateOnScroll>

        {/* ── Service cards grid ── */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 -mx-6 px-6 pb-4 [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-px sm:bg-gray-100 sm:rounded-2xl sm:overflow-hidden sm:shadow-sm">
          {services.map((s, i) => {
            const a = accentMap[s.accent];
            return (
              <AnimateOnScroll key={s.num} animation="fadeUp" delay={i * 70} duration={580} className="snap-start shrink-0 w-[78vw] sm:w-auto">
                <Link
                  href={s.href}
                  className={`group relative flex flex-col h-full bg-white px-7 py-8 transition-all duration-300 ${a.bg}`}
                >
                  {/* number + icon row */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-5xl font-black text-gray-100 group-hover:text-gray-200 transition-colors leading-none select-none">
                      {s.num}
                    </span>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${a.icon} transition-transform duration-300 group-hover:scale-110`}>
                      <ServiceIcon index={i} />
                    </div>
                  </div>

                  {/* top accent bar — scales in from left on hover */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] ${a.border} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400`} />

                  {/* content */}
                  <div className="flex-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${a.text} mb-2`}>
                      {s.tagline}
                    </p>
                    <h3 className="text-lg font-black text-dark mb-3 leading-snug group-hover:text-dark transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-dark leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  {/* bottom link */}
                  <div className={`flex items-center gap-1.5 mt-6 text-sm font-semibold ${a.text}`}>
                    Explore
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5 duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </AnimateOnScroll>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* Inline icons per service index */
function ServiceIcon({ index }: { index: number }) {
  const icons = [
    // 0 Height Safety
    <svg key={0} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7M12 3v18" />
    </svg>,
    // 1 Fire Safety
    <svg key={1} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>,
    // 2 First Aid
    <svg key={2} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>,
    // 3 Scaffolding
    <svg key={3} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>,
    // 4 Confined Space
    <svg key={4} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>,
    // 5 Defensive Driving
    <svg key={5} className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>,
  ];
  return icons[index] ?? null;
}
