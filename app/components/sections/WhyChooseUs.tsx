import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";

const certs = [
  { src: "/ISO-9001.webp",  label: "ISO 9001:2015" },
  { src: "/ISO-14001.webp", label: "ISO 14001:2015" },
  { src: "/cert3.webp",     label: "OHSAS 45001" },
];

const featurePills = [
  "Certified international trainers",
  "10,000+ professionals trained",
  "On site & centre based programs",
  "ISO 9001 · 14001 certified",
];

const steps = [
  { label: "Fill up an enquiry form", done: true  },
  { label: "Get a consultation call", done: false },
  { label: "Complete your training",  done: false },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative pt-20 lg:pt-28 overflow-hidden"
      style={{ background: "#080C18" }}
    >
      {/* diagonal texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 56px)" }} />
      {/* colour blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(204,33,40,0.09) 0%, transparent 60%)", transform: "translate(-30%,-30%)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(254,90,14,0.07) 0%, transparent 60%)", transform: "translate(30%,30%)" }} />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* label */}
        <AnimateOnScroll animation="fadeUp" className="text-center mb-10">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Why Choose ISDC</span>
            <span className="h-px w-10 bg-primary" />
          </div>
        </AnimateOnScroll>

        {/* ══ TOP ROW ══
            mobile  : 1 col (all stacked)
            sm–md   : 2 col — Card1 | Card2 top, Card3 full-width below (horizontal layout)
            lg+     : 3 equal cols
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Card 1 — image + social proof */}
          <AnimateOnScroll animation="fadeRight" delay={0} className="h-full">
            <div className="relative rounded-2xl overflow-hidden h-72 sm:h-full min-h-[300px] lg:min-h-[380px]">
              <Image src="/Training/ehs1.webp" alt="ISDC Training" fill loading="lazy" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />

              {/* badge */}
              <div className="absolute top-4 left-4 bg-dark/70 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-1.5">
                <span className="text-white text-xs font-black tracking-widest">ISDC</span>
              </div>

              {/* rating row */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {(["#cc2128","#257e43","#fe5a0e","#1a1a2e"] as const).map((bg, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#080C18] flex items-center justify-center text-[11px] font-black text-white" style={{ background: bg }}>
                        {["R","S","A","M"][i]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-white font-black text-sm leading-none">4.9</p>
                    <p className="text-white text-[10px] uppercase tracking-widest mt-0.5">Rating</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card 2 — headline + feature pills */}
          <AnimateOnScroll animation="fadeUp" delay={80} className="h-full">
            <div className="rounded-2xl bg-[#12151f] border border-white/[0.07] p-6 sm:p-7 flex flex-col justify-between h-full min-h-[300px] lg:min-h-[380px]">
              <h2 className="text-xl sm:text-2xl lg:text-[1.7rem] font-black text-white leading-snug">
                Save lives without ever sacrificing{" "}
                <span className="text-primary">compliance &amp; quality.</span>
              </h2>

              <div className="h-px bg-white/[0.08] my-5" />

              <div className="grid grid-cols-1 gap-3 flex-1">
                {featurePills.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
                      </svg>
                    </div>
                    <span className="text-white text-sm font-medium leading-snug">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card 3 — "Need for safety training"
              sm: spans 2 cols → horizontal layout (image left, text right)
              lg: 1 col → vertical layout (image top, text bottom) */}
          <AnimateOnScroll animation="fadeLeft" delay={160} className="sm:col-span-2 lg:col-span-1 h-full">
            <div className="rounded-2xl overflow-hidden bg-[#12151f] border border-white/[0.07] flex flex-col sm:flex-row lg:flex-col h-full min-h-[200px]">
              {/* image */}
              <div className="relative h-52 sm:h-auto sm:w-2/5 lg:h-52 lg:w-auto flex-shrink-0">
                <Image src="/Training/ehs3.webp" alt="Safety Training" fill loading="lazy" className="object-cover" />
                <div className="absolute inset-0 bg-dark/30" />
                <div className="absolute top-3 right-3 grid grid-cols-3 gap-1 pointer-events-none">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-white opacity-40" />
                  ))}
                </div>
              </div>
              {/* text */}
              <div className="p-5 sm:flex sm:flex-col sm:justify-center lg:block">
                <h3 className="text-white font-black text-base leading-snug">
                  Need for your{" "}
                  <span className="text-primary">safety training</span>
                </h3>
                <p className="text-white text-sm mt-2 leading-relaxed">
                  Protect your workforce with expert-led EHS programs designed to international standards.
                </p>
                <Link href="/services" className="inline-flex items-center gap-1.5 text-accent text-xs font-bold uppercase tracking-widest mt-4 hover:gap-3 transition-all">
                  Explore Services
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* ══ BOTTOM ROW ══
            mobile  : 1 col
            sm+     : 2 col
            lg+     : [1fr 420px]
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_420px] gap-4 mt-4">

          {/* Card 4 — primary red card */}
          <AnimateOnScroll animation="fadeRight" delay={240} className="h-full">
            <div className="relative rounded-2xl overflow-hidden bg-primary flex flex-col p-7 sm:p-8 h-full min-h-[340px]">
              <div className="absolute inset-0 pointer-events-none opacity-10"
                style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
              <div className="relative z-10">
                <p className="text-white text-[10px] font-bold uppercase tracking-[0.25em] mb-2">India&apos;s</p>
                <h3 className="text-white text-2xl sm:text-3xl font-black leading-tight">
                  #01 EHS Training Provider
                </h3>
                <p className="text-white text-sm mt-3 leading-relaxed max-w-sm">
                  Industry-grade safety programs designed to prevent every hazard with confidence and compliance.
                </p>
              </div>
              <div className="relative z-10 mt-auto pt-6 rounded-xl overflow-hidden h-36 sm:h-44">
                <Image src="/Training/ehs2.webp" alt="EHS Training" fill loading="lazy" className="object-cover rounded-xl" />
                <div className="absolute inset-0 bg-dark/20 rounded-xl" />
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card 5 — 3 steps */}
          <AnimateOnScroll animation="fadeLeft" delay={320} className="h-full">
            <div className="rounded-2xl overflow-hidden bg-[#12151f] border border-white/[0.07] flex flex-col h-full min-h-[340px]">
              <div className="relative h-44 sm:h-48 flex-shrink-0">
                <Image src="/Training/ehs5.webp" alt="Training Steps" fill loading="lazy" className="object-cover" />
                <div className="absolute inset-0 bg-dark/50" />
              </div>
              <div className="p-6 flex flex-col justify-between flex-1 gap-5">
                <h3 className="text-white font-black text-base sm:text-lg">
                  3 Steps for Your Safety Training
                </h3>

                {/* steps */}
                <div className="flex flex-col gap-3">
                  {steps.map((s, i) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${s.done ? "bg-primary border-primary" : "border-white/30"}`}>
                        {s.done
                          ? <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          : <div className="w-2 h-2 rounded-full bg-white opacity-30" />
                        }
                      </div>
                      <span className="text-white text-sm font-medium">{s.label}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-full w-fit hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  Get Started
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </AnimateOnScroll>

        </div>
      </div>

      {/* ── Certifications stripe ── */}
      <div className="relative overflow-hidden mt-16"
        style={{ background: "linear-gradient(90deg, #000 0%, #151515 30%, #1f1f1f 50%, #151515 70%, #000 100%)", backgroundSize: "200% auto", animation: "shimmer 5s linear infinite" }}>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="max-w-[1400px] mx-auto py-8 overflow-hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-10 sm:gap-20 sm:justify-center sm:flex-wrap px-6 [&::-webkit-scrollbar]:hidden">
            {certs.map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-3 snap-center shrink-0 sm:shrink">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image src={c.src} alt={c.label} fill loading="lazy" className="object-contain" />
                </div>
                <span className="text-white text-xs font-semibold tracking-wide text-center">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
