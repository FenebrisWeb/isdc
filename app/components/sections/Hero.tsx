"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── Slide data ────────────────────────────────────────── */
const slides = [
  {
    id: 1,
    eyebrow: "Height Safety Specialists",
    title: "India's Premier Industrial Safety Training Council",
    highlight: "Safety Training",
    subtitle:
      "Empowering 10,000+ professionals with world-class EHS training since 2008. ISO 9001, ISO 14001 & OHSAS 45001 certified.",
    primaryCta: { label: "Explore Services", href: "/complete-EHS-services-Package" },
    secondaryCta: { label: "Get a Quote", href: "/contact" },
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
    stat: { value: "10K+", label: "Professionals Trained" },
    tag: "01",
  },
  {
    id: 2,
    eyebrow: "Fire Safety & Audits",
    title: "World-Class Fire Safety Training & Audits",
    highlight: "Fire Safety",
    subtitle:
      "Comprehensive fire safety programs covering risk assessment, drills, and emergency preparedness for industrial environments.",
    primaryCta: { label: "View Programs", href: "/services/fire-safety" },
    secondaryCta: { label: "Contact Us", href: "/contact" },
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80",
    stat: { value: "500+", label: "Audits Conducted" },
    tag: "02",
  },
  {
    id: 3,
    eyebrow: "Occupational Health & Wellness",
    title: "Certified First Aid & Complete EHS Services",
    highlight: "First Aid",
    subtitle:
      "From ergonomics to emergency preparedness — complete occupational health solutions for a safer, healthier workplace.",
    primaryCta: { label: "Our Services", href: "/complete-EHS-services-Package" },
    secondaryCta: { label: "Book Training", href: "/contact" },
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    stat: { value: "15+", label: "Years of Excellence" },
    tag: "03",
  },
];

/* ── Parallax shape config (depth = px moved per unit mouse offset) ── */
const shapes = [
  { id: 1, size: 480, left: "78%", top: "-8%",  depth: 18, opacity: 0.055, ring: true,  delay: "0s"    },
  { id: 2, size: 260, left: "88%", top: "55%",  depth: 30, opacity: 0.04,  ring: true,  delay: "0.6s"  },
  { id: 3, size: 160, left: "6%",  top: "12%",  depth: 10, opacity: 0.06,  ring: false, delay: "1.2s"  },
  { id: 4, size: 90,  left: "58%", top: "82%",  depth: 38, opacity: 0.09,  ring: false, delay: "0.3s"  },
  { id: 5, size: 320, left: "18%", top: "72%",  depth: 22, opacity: 0.035, ring: true,  delay: "0.9s"  },
  { id: 6, size: 70,  left: "68%", top: "18%",  depth: 42, opacity: 0.10,  ring: false, delay: "0.15s" },
  { id: 7, size: 200, left: "40%", top: "-5%",  depth: 14, opacity: 0.05,  ring: true,  delay: "1.5s"  },
];

export default function Hero() {
  const [active, setActive]       = useState(0);
  const [animKey, setAnimKey]     = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef   = useRef({ x: 0, y: 0 });          // raw target
  const lerpRef    = useRef({ x: 0, y: 0 });           // smoothed value
  const rafRef     = useRef<number>(0);

  /* ── Mouse tracking with lerp ─────────────────────────── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,  // -1 → 1
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      lerpRef.current.x = lerp(lerpRef.current.x, mouseRef.current.x, 0.07);
      lerpRef.current.y = lerp(lerpRef.current.y, mouseRef.current.y, 0.07);

      if (sectionRef.current) {
        sectionRef.current.style.setProperty("--mx", String(lerpRef.current.x));
        sectionRef.current.style.setProperty("--my", String(lerpRef.current.y));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Slider logic ─────────────────────────────────────── */
  const goTo = useCallback(
    (i: number) => {
      if (i === active) return;
      setActive(i);
      setAnimKey((k) => k + 1);
      setProgressKey((k) => k + 1);
    },
    [active]
  );

  const next = useCallback(() => goTo((active + 1) % slides.length), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + slides.length) % slides.length), [active, goTo]);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[active];

  /* ── Highlight word helper ────────────────────────────── */
  const renderTitle = (title: string, highlight: string) => {
    const idx = title.indexOf(highlight);
    if (idx === -1) return <>{title}</>;
    return (
      <>
        {title.slice(0, idx)}
        <span className="relative inline-block">
          <span className="relative z-10 text-primary">{highlight}</span>
          {/* animated underline */}
          <span
            className="absolute bottom-0 left-0 h-[3px] bg-primary rounded-full"
            style={{ width: "100%", animation: "fadeInLeft 0.6s ease 0.5s both" }}
          />
        </span>
        {title.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-dark select-none"
      style={
        {
          height: "clamp(580px, 78vh, 800px)",
          "--mx": "0",
          "--my": "0",
        } as React.CSSProperties
      }
    >
      {/* ══ 1. Background images ══════════════════════════════ */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: i === active ? 1 : 0,
            transform: "scale(1.04)",
            transformOrigin: "center",
          }}
        >
          <Image src={s.image} alt={s.title} fill className="object-cover" priority={i === 0} />
        </div>
      ))}

      {/* ══ 2. Layered overlays ═══════════════════════════════ */}
      {/* Primary dark gradient — heavier on the left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, rgba(10,10,20,0.95) 30%, rgba(10,10,20,0.75) 60%, rgba(10,10,20,0.35) 100%)",
        }}
      />
      {/* Bottom vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(10,10,20,0.7) 0%, transparent 40%)" }}
      />
      {/* Mouse-reactive colour glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(700px circle at calc(50% + var(--mx) * 20%) calc(50% + var(--my) * 15%), rgba(204,33,40,0.13) 0%, transparent 65%)",
        }}
      />

      {/* ══ 3. Floating parallax shapes ═══════════════════════ */}
      {shapes.map((s) => (
        <div
          key={s.id}
          className="absolute pointer-events-none"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            marginLeft: -(s.size / 2),
            marginTop: -(s.size / 2),
            opacity: s.opacity,
            transform: `translate(calc(var(--mx) * ${s.depth}px), calc(var(--my) * ${s.depth}px))`,
          }}
        >
          {s.ring ? (
            /* rotating ring */
            <div
              className="w-full h-full rounded-full border border-white hero-spin-slow"
              style={{ animationDelay: s.delay, animationDirection: s.id % 2 ? "normal" : "reverse" }}
            />
          ) : (
            /* pulsing filled circle */
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute w-full h-full rounded-full bg-primary/30 hero-ring-pulse" style={{ animationDelay: s.delay }} />
              <div className="w-1/3 h-1/3 rounded-full bg-white/60" />
            </div>
          )}
        </div>
      ))}

      {/* ══ 4. Decorative corner brackets ════════════════════ */}
      <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-primary/60 pointer-events-none" />
      <div className="absolute bottom-20 right-8 w-10 h-10 border-b-2 border-r-2 border-primary/60 pointer-events-none" />

      {/* ══ 5. Vertical slide tag ════════════════════════════ */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 z-10">
        <div className="w-px h-16 bg-white/15" />
        <span className="text-white/20 text-xs font-mono tracking-[0.3em] rotate-90 origin-center">
          {slide.tag} / {String(slides.length).padStart(2, "0")}
        </span>
        <div className="w-px h-16 bg-white/15" />
      </div>

      {/* ══ 6. Main content ══════════════════════════════════ */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center">
        <div key={animKey} className="max-w-3xl">

          {/* Eyebrow */}
          <div className="hero-animate-badge flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-primary" />
            <span className="text-primary text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
              {slide.eyebrow}
            </span>
            <span className="h-px w-4 bg-primary/40" />
          </div>

          {/* Heading */}
          <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] font-black text-white leading-[1.08] tracking-tight mb-6">
            {renderTitle(slide.title, slide.highlight)}
          </h1>

          {/* Subtitle */}
          <p className="hero-animate-sub text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mb-9">
            {slide.subtitle}
          </p>

          {/* CTAs */}
          <div className="hero-animate-cta flex flex-wrap gap-4 mb-10">
            <Link
              href={slide.primaryCta.href}
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white text-sm font-bold rounded-full overflow-hidden hover:bg-red-700 transition-colors shadow-xl shadow-red-900/30"
            >
              {/* shimmer overlay */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                  backgroundSize: "200% auto",
                  animation: "shimmer 0.6s linear",
                }}
              />
              <span className="relative">{slide.primaryCta.label}</span>
              <svg className="relative w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={slide.secondaryCta.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 text-white text-sm font-semibold rounded-full hover:border-white/60 hover:bg-white/8 transition-all backdrop-blur-sm"
            >
              {slide.secondaryCta.label}
            </Link>
          </div>

          {/* Stats row */}
          <div className="hero-animate-stat flex flex-wrap items-center gap-x-8 gap-y-3">
            <div>
              <p className="text-2xl sm:text-4xl font-black text-white leading-none">{slide.stat.value}</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{slide.stat.label}</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            <div className="flex flex-wrap gap-2">
              {[
                { label: "ISO 9001", green: false },
                { label: "ISO 14001", green: true },
                { label: "OHSAS 45001", green: true },
              ].map((c) => (
                <span
                  key={c.label}
                  className={`text-xs rounded-full px-3 py-1 ${c.green ? "text-secondary/80 border border-secondary/25 bg-secondary/5" : "text-gray-300 border border-white/12 bg-white/4"}`}
                >
                  {c.label} ✓
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ 7. Bottom control bar ════════════════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Progress bar */}
        <div className="h-[2px] bg-white/8">
          <div key={progressKey} className="hero-progress h-full bg-primary origin-left" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === active
                    ? "w-8 h-[5px] bg-primary"
                    : "w-[5px] h-[5px] bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="hidden sm:block text-white/30 text-xs font-mono tracking-wider">
            <span className="text-white/70 font-semibold">{String(active + 1).padStart(2, "0")}</span>
            <span className="mx-1">/</span>
            {String(slides.length).padStart(2, "0")}
          </span>

          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-primary hover:text-white hover:bg-primary/20 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-primary hover:text-white hover:bg-primary/20 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
