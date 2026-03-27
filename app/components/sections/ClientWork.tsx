import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";

const projects = [
  { service: "Complete EHS Services",        client: "BSES Yamuna Power Ltd.", year: "2024" },
  { service: "Height Safety Training",        client: "CNH Industrial",         year: "2024" },
  { service: "Fire Safety Audit",             client: "Ashoka University",      year: "2023" },
  { service: "Scaffolding Training",          client: "Metcon",                 year: "2023" },
  { service: "Defensive Driving Program",     client: "Exo SpaceX",             year: "2022" },
  { service: "Confined Space Training",       client: "Reliance Energy",        year: "2022" },
  { service: "Occupational Health Training",  client: "Delhi Govt.",            year: "2021" },
];

export default function ClientWork() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#080C18" }}
    >
      {/* seamless top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">

        {/* ── Header ── */}
        <AnimateOnScroll animation="fadeUp" className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-accent" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Recent Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white leading-[1.08] tracking-tight">
              Clients &amp; <span className="text-primary">Projects</span>
            </h2>
          </div>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition-colors self-start sm:self-auto"
          >
            View All
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </AnimateOnScroll>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: sticky image ── */}
          <AnimateOnScroll animation="fadeRight" className="lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl">
              <Image
                src="/Training/ehs2.webp"
                alt="ISDC Training"
                fill
                loading="lazy"
                className="object-cover"
              />
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />

              {/* stat badge — top right */}
              <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-right">
                <p className="text-white font-black text-2xl leading-none">7+</p>
                <p className="text-white/50 text-[10px] uppercase tracking-widest mt-0.5">Industries</p>
              </div>

              {/* CTA — bottom */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <p className="text-white font-black text-lg leading-none">50+ Clients</p>
                  <p className="text-white/50 text-xs mt-0.5">Across India</p>
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-accent text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-accent/90 transition-colors shadow-lg shadow-accent/30"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  About Us
                </Link>
              </div>
            </div>
          </AnimateOnScroll>

          {/* ── Right: project list ── */}
          <div className="flex flex-col">
            {/* table header */}
            <div className="flex items-center gap-4 pb-3 mb-1 border-b border-white/[0.07] pl-4">
              <span className="w-7 shrink-0" />
              <span className="flex-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">Service</span>
              <span className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.2em] text-secondary w-44 text-right">Client</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white w-14 text-right">Year</span>
            </div>

            {projects.map((p, i) => (
              <AnimateOnScroll key={p.service} animation="fadeLeft" delay={i * 60}>
                <div className="group relative flex items-center gap-4 py-5 pl-4 border-b border-white/[0.06] overflow-hidden cursor-default hover:border-white/[0.14] transition-colors duration-300">

                  {/* hover background sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                  {/* left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-400" />

                  {/* index number */}
                  <span className="relative z-10 w-7 shrink-0 text-[11px] font-black text-white transition-colors duration-300 pl-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* service name + mobile company name */}
                  <div className="relative z-10 flex-1 flex flex-col gap-1">
                    <span className="text-sm font-black text-white uppercase tracking-wide group-hover:text-primary transition-colors duration-300">
                      {p.service}
                    </span>
                    <span className="sm:hidden text-[11px] font-semibold text-secondary uppercase tracking-widest">
                      {p.client}
                    </span>
                  </div>

                  {/* client — desktop only */}
                  <span className="relative z-10 hidden sm:block text-xs font-semibold text-secondary uppercase tracking-widest w-44 text-right transition-colors duration-300">
                    {p.client}
                  </span>

                  {/* year */}
                  <span className="relative z-10 text-sm font-black text-accent w-14 text-right group-hover:text-white transition-colors duration-300">
                    {p.year}
                  </span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
