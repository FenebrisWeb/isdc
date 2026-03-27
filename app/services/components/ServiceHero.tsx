import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  highlight: string;
  eyebrow: string;
  subtitle: string;
  breadcrumb: string;
  image: string;
}

export default function ServiceHero({ title, highlight, eyebrow, subtitle, breadcrumb, image }: Props) {
  const idx = title.indexOf(highlight);
  return (
    <section className="relative w-full overflow-hidden bg-dark" style={{ height: "clamp(440px, 60vh, 680px)" }}>
      <Image src={image} alt={title} fill className="object-cover scale-[1.04]" priority />

      {/* overlays */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(10,10,20,0.95) 30%, rgba(10,10,20,0.75) 60%, rgba(10,10,20,0.35) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,20,0.7) 0%, transparent 40%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(700px circle at 30% 50%, rgba(204,33,40,0.10) 0%, transparent 65%)" }} />

      {/* shapes */}
      {[
        { size: 420, left: "78%", top: "-8%",  opacity: 0.05,  ring: true  },
        { size: 220, left: "88%", top: "55%",  opacity: 0.04,  ring: true  },
        { size: 140, left: "6%",  top: "12%",  opacity: 0.055, ring: false },
        { size: 80,  left: "58%", top: "80%",  opacity: 0.08,  ring: false },
      ].map((s, i) => (
        <div key={i} className="absolute pointer-events-none" style={{ left: s.left, top: s.top, width: s.size, height: s.size, marginLeft: -(s.size / 2), marginTop: -(s.size / 2), opacity: s.opacity }}>
          {s.ring
            ? <div className="w-full h-full rounded-full border border-white hero-spin-slow" />
            : <div className="relative w-full h-full flex items-center justify-center"><div className="absolute w-full h-full rounded-full bg-primary/30 hero-ring-pulse" /><div className="w-1/3 h-1/3 rounded-full bg-white/60" /></div>
          }
        </div>
      ))}

      {/* corner brackets */}
      <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-primary/60 pointer-events-none" />
      <div className="absolute bottom-16 right-8 w-10 h-10 border-b-2 border-r-2 border-primary/60 pointer-events-none" />

      {/* content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* breadcrumb */}
          <div className="hero-animate-badge flex items-center gap-2 text-xs text-white/40 font-medium mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/complete-EHS-services-Package" className="hover:text-white transition-colors">Services</Link>
            {breadcrumb !== "Services" && <><span>/</span><span className="text-white/70">{breadcrumb}</span></>}
          </div>

          {/* eyebrow */}
          <div className="hero-animate-badge flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-primary" />
            <span className="text-primary text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">{eyebrow}</span>
            <span className="h-px w-4 bg-primary/40" />
          </div>

          {/* heading */}
          <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-white leading-[1.08] tracking-tight mb-6">
            {idx === -1 ? title : (
              <>
                {title.slice(0, idx)}
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary">{highlight}</span>
                  <span className="absolute bottom-0 left-0 h-[3px] w-full bg-primary rounded-full" style={{ animation: "fadeInLeft 0.6s ease 0.5s both" }} />
                </span>
                {title.slice(idx + highlight.length)}
              </>
            )}
          </h1>

          <p className="hero-animate-sub text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
            {subtitle}
          </p>
        </div>
      </div>

      {/* bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/8">
        <div className="h-full w-1/3 bg-primary" />
      </div>
    </section>
  );
}
