import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";

const highlights = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: "EHS Training & Compliance",
    desc: "Nationally recognised courses for all risk levels",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    label: "Sustainability Reporting",
    desc: "ISO 14001 aligned environmental solutions",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    label: "Social Accountability",
    desc: "Energy management & SA8000 frameworks",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    label: "Skill Development",
    desc: "Building confident, competent safety professionals",
  },
];

export default function About() {
  return (
    <section className="relative bg-gray-50 overflow-hidden py-20 lg:py-28">
      {/* subtle dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #1a1a2e 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* top-right glow blob */}
      <div
        className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(204,33,40,0.06) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT: image stack ── */}
          <AnimateOnScroll animation="fadeRight" duration={750} className="order-2 lg:order-1">
            <div className="relative">
              {/* background colour slab */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-primary/8 -z-10" />

              {/* main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
                <Image
                  src="/Training/ehs-mIN.webp"
                  alt="ISDC Training Session"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />

                {/* bottom caption inside image */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold leading-none">ISO Certified Institute</p>
                      <p className="text-white/60 text-xs mt-0.5">9001 · 14001 · OHSAS 45001</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* floating badge — top-left */}
              <div className="absolute -top-6 -left-6 bg-secondary text-white rounded-2xl px-5 py-4 shadow-2xl">
                <p className="text-4xl font-black leading-none">2008</p>
                <p className="text-xs text-white/70 uppercase tracking-widest mt-1">Est. Year</p>
              </div>

              {/* floating badge — right middle */}
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 bg-primary text-white rounded-2xl px-5 py-4 shadow-2xl">
                <p className="text-4xl font-black leading-none">10K+</p>
                <p className="text-xs text-white/70 uppercase tracking-widest mt-1">Trained</p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* ── RIGHT: content ── */}
          <div className="order-1 lg:order-2">

            <AnimateOnScroll animation="fadeLeft" delay={0}>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-primary" />
                <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
                  Welcome to ISDC
                </span>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={80}>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-dark leading-[1.08] tracking-tight mb-3">
                Industrial Safety
              </h2>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-[1.08] tracking-tight mb-6">
                <span className="text-primary">Development</span> Council
              </h2>
            </AnimateOnScroll>

            {/* blockquote / mission line */}
            <AnimateOnScroll animation="fadeUp" delay={160}>
              <div className="border-l-4 border-secondary pl-4 mb-6">
                <p className="text-dark/80 text-sm italic leading-relaxed">
                  "Our prime aim — to impart safety training among workers exposed to occupational hazards, building a safer India one professional at a time."
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={230}>
              <p className="text-dark text-base leading-relaxed mb-4">
                Established in <strong className="text-dark">2008</strong>, ISDC is spreading its wings across{" "}
                <strong className="text-dark">Sustainability Reporting</strong> and providing Environment,
                Occupational Health &amp; Safety, Social Accountability, and Energy Management
                Systems Solutions.
              </p>
              <p className="text-dark text-base leading-relaxed mb-8">
                Our goal also includes training safety professionals — enabling them with the skills
                and knowledge to act with confidence and competence to respond to accidents.
              </p>
            </AnimateOnScroll>

            {/* 2×2 highlight grid */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {highlights.map((h, i) => {
                const isGreen = i % 2 !== 0;
                return (
                  <AnimateOnScroll key={i} animation="scaleIn" delay={300 + i * 70}>
                    <div className={`flex flex-col gap-2 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm transition-all duration-300 ${isGreen ? "hover:border-secondary/25 hover:shadow-md" : "hover:border-primary/25 hover:shadow-md"}`}>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isGreen ? "bg-secondary/8 text-secondary" : "bg-primary/8 text-primary"}`}>
                        {h.icon}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-dark">{h.label}</p>
                        <p className="text-xs text-dark/70 mt-0.5 leading-snug">{h.desc}</p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>

            <AnimateOnScroll animation="fadeUp" delay={590}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-dark text-white text-sm font-bold rounded-full hover:bg-primary transition-colors duration-300 shadow-lg"
                >
                  Discover Our Story
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-dark/60 hover:text-primary transition-colors">
                  Get in Touch
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </div>
    </section>
  );
}
