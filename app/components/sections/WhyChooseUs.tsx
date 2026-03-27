import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";

const certs = [
  { src: "/ISO-9001.webp",  label: "ISO 9001:2015" },
  { src: "/ISO-14001.webp", label: "ISO 14001:2015" },
  { src: "/cert3.webp",     label: "OHSAS 45001" },
];

const features = [
  {
    num: "01",
    title: "Expert Trainers",
    description: "Certified professionals with real-site experience across height safety, fire, confined spaces, and occupational health.",
    accent: "primary" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-1a8 8 0 0116 0v1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l1.5 2L12 14l1.5 2L15 14" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "24/7 Support",
    description: "Round-the-clock guidance — before enrolment, during training, and after certification.",
    accent: "accent" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="9" strokeLinecap="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3.5 3.5" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Global Standards",
    description: "Programs aligned with OSHA, IS, ISO 45001, and NEBOSH — recognised by clients and regulators alike.",
    accent: "secondary" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Proven Results",
    description: "Over 10,000 certified professionals and a consistent record of zero post-training compliance failures.",
    accent: "primary" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l4-8 4 5 3-3 4 6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18" />
      </svg>
    ),
  },
];

const accent = {
  primary:   { bar: "bg-primary",   iconBg: "bg-primary/10",   iconTx: "text-primary",   border: "group-hover:border-primary/40",   glow: "group-hover:shadow-primary/10"   },
  accent:    { bar: "bg-accent",    iconBg: "bg-accent/10",    iconTx: "text-accent",    border: "group-hover:border-accent/40",    glow: "group-hover:shadow-accent/10"    },
  secondary: { bar: "bg-secondary", iconBg: "bg-secondary/10", iconTx: "text-secondary", border: "group-hover:border-secondary/40", glow: "group-hover:shadow-secondary/10" },
};

export default function WhyChooseUs() {
  return (
    <section
      className="relative pt-20 lg:pt-28 overflow-hidden"
      style={{ background: "#080C18" }}
    >
      {/* ── Texture: diagonal lines ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 56px)",
        }}
      />

      {/* ── Colour blobs for depth ── */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(204,33,40,0.09) 0%, transparent 60%)", transform: "translate(-30%, -30%)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(254,90,14,0.07) 0%, transparent 60%)", transform: "translate(30%, 30%)" }} />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,126,67,0.05) 0%, transparent 60%)", transform: "translate(-50%, -50%)" }} />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Header ── */}
        <AnimateOnScroll animation="fadeUp" className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Our Strengths</span>
            <span className="h-px w-10 bg-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white leading-[1.08] tracking-tight">
            Why Choose{" "}
            <span className="text-primary">ISDC</span>?
          </h2>
        </AnimateOnScroll>

        {/* ── Trinity grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px_1fr] gap-4 lg:gap-5 items-stretch">

          {/* ── Left features ── */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 order-2 lg:order-1">
            {features.slice(0, 2).map((f, i) => {
              const s = accent[f.accent];
              return (
                <AnimateOnScroll key={f.num} animation="fadeRight" delay={i * 90} className="h-full">
                  <div className={`group relative overflow-hidden h-full rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 lg:p-7 transition-all duration-400 hover:-translate-y-1.5 ${s.border} hover:bg-white/[0.05] hover:shadow-xl ${s.glow}`}>
                    {/* Left accent bar */}
                    <div className={`absolute left-0 top-8 bottom-8 w-[3px] ${s.bar} rounded-r-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-400`} />
                    {/* Watermark number */}
                    <span className="absolute top-3 right-4 text-5xl font-black text-white/[0.04] select-none leading-none">{f.num}</span>
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl ${s.iconBg} ${s.iconTx} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                      {f.icon}
                    </div>
                    <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
                    <p className="text-white/70 text-xs leading-relaxed">{f.description}</p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>

          {/* ── Centre spotlight ── */}
          <AnimateOnScroll animation="scaleIn" delay={120} className="order-1 lg:order-2 h-full">
            <div
              className="relative overflow-hidden rounded-2xl h-full min-h-[380px] flex flex-col justify-between p-8"
              style={{ background: "linear-gradient(150deg, #cc2128 0%, #8b0c10 55%, #3d0204 100%)" }}
            >
              {/* Spinning rings */}
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full border border-white/10 hero-spin-slow pointer-events-none" />
              <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full border border-white/[0.07] hero-spin-slow pointer-events-none" style={{ animationDirection: "reverse", animationDuration: "28s" }} />
              {/* Bottom arc */}
              <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full border border-white/[0.06] pointer-events-none" />

              {/* Top label */}
              <div className="relative z-10">
                <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.22em]">Why Choose Us</span>
                <h3 className="text-white text-2xl font-black mt-2 leading-tight">
                  Trusted by thousands of professionals
                </h3>
              </div>

              {/* Stats */}
              <div className="relative z-10 my-8 space-y-5">
                {[
                  { val: "10,000+", label: "Professionals Certified" },
                  { val: "15+ Yrs", label: "Industry Experience since 2008" },
                  { val: "ISO",     label: "9001 · 14001 · OHSAS 45001" },
                ].map((s) => (
                  <div key={s.val} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-px self-stretch bg-white/20" />
                    <div>
                      <p className="text-white font-black text-xl leading-none">{s.val}</p>
                      <p className="text-white/45 text-xs mt-0.5">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="relative z-10">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-colors shadow-xl"
                >
                  Discover ISDC
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Floating badge */}
              <div className="hero-float absolute bottom-24 right-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 pointer-events-none">
                <p className="text-white text-xs font-bold leading-none">ISO Certified</p>
                <p className="text-white/50 text-[10px] mt-0.5">Est. 2008</p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* ── Right features ── */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 order-3">
            {features.slice(2, 4).map((f, i) => {
              const s = accent[f.accent];
              return (
                <AnimateOnScroll key={f.num} animation="fadeLeft" delay={i * 90} className="h-full">
                  <div className={`group relative overflow-hidden h-full rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 lg:p-7 transition-all duration-400 hover:-translate-y-1.5 ${s.border} hover:bg-white/[0.05] hover:shadow-xl ${s.glow}`}>
                    <div className={`absolute left-0 top-8 bottom-8 w-[3px] ${s.bar} rounded-r-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-400`} />
                    <span className="absolute top-3 right-4 text-5xl font-black text-white/[0.04] select-none leading-none">{f.num}</span>
                    <div className={`w-11 h-11 rounded-xl ${s.iconBg} ${s.iconTx} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                      {f.icon}
                    </div>
                    <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
                    <p className="text-white/70 text-xs leading-relaxed">{f.description}</p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── Certifications stripe — flush to section bottom ── */}
      <div
        className="relative overflow-hidden mt-16"
        style={{
          background: "linear-gradient(90deg, #000 0%, #151515 30%, #1f1f1f 50%, #151515 70%, #000 100%)",
          backgroundSize: "200% auto",
          animation: "shimmer 5s linear infinite",
        }}
      >
        {/* top edge line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="max-w-[1400px] mx-auto py-8 overflow-hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-10 sm:gap-20 sm:justify-center sm:flex-wrap px-6 [&::-webkit-scrollbar]:hidden">
          {certs.map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-3 snap-center shrink-0 sm:shrink">
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image src={c.src} alt={c.label} fill loading="lazy" className="object-contain" />
              </div>
              <span className="text-white/55 text-xs font-semibold tracking-wide text-center">{c.label}</span>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
