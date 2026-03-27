// ─────────────────────────────────────────────────────────────────────────────
// Update the `logos` array below with the actual filenames from /public/partner-logo/
// e.g. { src: "/partner-logo/jio.png", alt: "Jio" }
// ─────────────────────────────────────────────────────────────────────────────

const logos = [
  { src: "/Partner-logo/airtel.webp",    alt: "Airtel" },
  { src: "/Partner-logo/ashoka.webp",    alt: "Ashoka" },
  { src: "/Partner-logo/bluestar.webp",  alt: "Blue Star" },
  { src: "/Partner-logo/indian-oil.webp",alt: "Indian Oil" },
  { src: "/Partner-logo/oil.webp",       alt: "Oil Partner" },
  { src: "/Partner-logo/tata-power.webp",alt: "Tata Power" },
  { src: "/Partner-logo/vodafone.webp",  alt: "Vodafone" },
];

export default function PartnerLogos() {
  // Duplicate for seamless infinite loop
  const track = [...logos, ...logos];

  return (
    <section className="py-14 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-px w-8 bg-primary" />
              <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Industry Experience</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-dark leading-tight">
              Trusted by India&apos;s Leading{" "}
              <span className="text-primary">Telecom Companies</span>
            </h2>
          </div>
          <p className="text-dark text-sm leading-relaxed max-w-xs sm:text-right">
            Over 15 years delivering height safety, tower climbing, and EHS training for the nation&apos;s top telecom and infrastructure operators.
          </p>
        </div>
      </div>

      {/* Scrolling logo strip */}
      <div className="relative">
        {/* fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />

        <div
          className="flex gap-10 items-center"
          style={{ animation: "marqueeScroll 28s linear infinite", width: "max-content" }}
        >
          {track.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-14 w-36 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom stat strip */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mt-10">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {[
            { value: "50+", label: "Telecom & Infra Clients" },
            { value: "5,000+", label: "Tower Climbers Trained" },
            { value: "Pan India", label: "Project Coverage" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-xl font-black text-primary">{s.value}</span>
              <span className="text-dark text-xs font-semibold uppercase tracking-widest">{s.label}</span>
              <span className="h-4 w-px bg-gray-200 last:hidden" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
