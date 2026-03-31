"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Image data ─────────────────────────────────────────────────────────────────

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  desc: string;
  category: "training" | "events" | "services";
  aspect: string;
}

const IMAGES: GalleryImage[] = [
  {
    src: "/Training/ehs1.webp",
    alt: "Work at Height Training",
    title: "Work at Height Training",
    desc: "Hands-on tower climbing & aerial rescue techniques",
    category: "training",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/Training/ehs2.webp",
    alt: "Fire Safety Workshop",
    title: "Fire Safety Workshop",
    desc: "Live fire fighting exercises with practical drills",
    category: "training",
    aspect: "aspect-[16/9]",
  },
  {
    src: "/Training/ehs3.webp",
    alt: "First Aid Certification",
    title: "First Aid Certification",
    desc: "CPR, AED & emergency response training",
    category: "training",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/Training/ehs4.webp",
    alt: "EHS Compliance Training",
    title: "EHS Compliance Training",
    desc: "Regulatory compliance & safety management systems",
    category: "training",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/Training/ehs5.webp",
    alt: "Scaffolding Safety",
    title: "Scaffolding Safety",
    desc: "Safe scaffold erection, inspection & dismantling",
    category: "training",
    aspect: "aspect-[16/9]",
  },
  {
    src: "/Training/ehs6.webp",
    alt: "Defensive Driving",
    title: "Defensive Driving & Road Safety",
    desc: "Accident prevention & road risk management",
    category: "training",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/Training/ehs-mIN.webp",
    alt: "On-Site Safety Assessment",
    title: "On-Site Safety Assessment",
    desc: "Field inspection & hazard identification",
    category: "training",
    aspect: "aspect-[16/9]",
  },
  {
    src: "/Gallery/training3-1.jpg",
    alt: "Client Site Training",
    title: "Training at Client Site",
    desc: "Customised on-site EHS training programmes",
    category: "events",
    aspect: "aspect-[16/9]",
  },
  {
    src: "/Gallery/service14.jpg",
    alt: "EHS Consulting",
    title: "EHS Consulting Services",
    desc: "Expert advisory & compliance support",
    category: "services",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/Gallery/events5-1.jpg",
    alt: "Industry Safety Conference",
    title: "Industry Safety Conference",
    desc: "Knowledge sharing & industry networking",
    category: "events",
    aspect: "aspect-[4/3]",
  },
];

// ── Category config ────────────────────────────────────────────────────────────

const CATS = [
  { id: "all",      label: "All Photos",  color: "#cc2128" },
  { id: "training", label: "Training",    color: "#257e43" },
  { id: "events",   label: "Events",      color: "#fe5a0e" },
  { id: "services", label: "Services",    color: "#0369a1" },
] as const;

const CAT_COLOR: Record<string, string> = {
  training: "#257e43",
  events:   "#fe5a0e",
  services: "#0369a1",
};

// ── Page ───────────────────────────────────────────────────────────────────────

export default function GalleryClient() {
  const [activeCat, setActiveCat] = useState("all");
  const [lightbox, setLightbox]   = useState<number | null>(null);

  const filtered = activeCat === "all"
    ? IMAGES
    : IMAGES.filter((img) => img.category === activeCat);

  const close = useCallback(() => setLightbox(null), []);
  const prev  = useCallback(
    () => setLightbox((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null)),
    [filtered.length]
  );
  const next  = useCallback(
    () => setLightbox((i) => (i !== null ? (i + 1) % filtered.length : null)),
    [filtered.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, close, prev, next]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  function handleCatChange(id: string) {
    setActiveCat(id);
    setLightbox(null);
  }

  const counts: Record<string, number> = {
    all:      IMAGES.length,
    training: IMAGES.filter((i) => i.category === "training").length,
    events:   IMAGES.filter((i) => i.category === "events").length,
    services: IMAGES.filter((i) => i.category === "services").length,
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: "#080C18" }}>

        {/* Decorative grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.013) 0px, rgba(255,255,255,0.013) 1px, transparent 1px, transparent 56px)" }}
        />
        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(700px circle at 15% 55%, rgba(254,90,14,0.11) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(500px circle at 90% 15%, rgba(204,33,40,0.10) 0%, transparent 60%)" }} />
        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-accent/40 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-primary/40 pointer-events-none" />

        {/* Decorative large background text */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden">
          <p className="text-[12rem] font-black text-white/[0.025] leading-none tracking-tighter pr-8">
            GALLERY
          </p>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/35 font-medium mb-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">Gallery</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

            {/* Left: headline */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-accent" />
                  <span className="text-accent text-[11px] font-black uppercase tracking-[0.3em]">Visual Gallery</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-[3.75rem] font-black text-white leading-[1.05] tracking-tight">
                Training<br />
                <span className="text-accent">in Action</span>
              </h1>

              <p className="text-white/45 text-base mt-5 max-w-md leading-relaxed">
                A window into ISDC&apos;s world-class EHS training programmes — real professionals, real environments, real results.
              </p>
            </div>

            {/* Right: stat chips */}
            <div className="flex items-center gap-5 lg:pb-2">
              {[
                { value: `${IMAGES.length}+`, label: "Captures",  color: "#fe5a0e" },
                { value: "7+",                label: "Programmes", color: "#cc2128" },
                { value: "15+",               label: "Years",      color: "#257e43" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-black text-2xl leading-none" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.05]">
          <div className="h-full w-2/5 bg-gradient-to-r from-accent via-primary to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          GALLERY
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

          {/* Category filter */}
          <div className="flex items-center gap-2.5 flex-wrap mb-10">
            {CATS.map((cat) => {
              const isActive = activeCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCatChange(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-lg scale-[1.03]"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 shadow-sm"
                  }`}
                  style={isActive ? { background: cat.color, boxShadow: `0 6px 18px ${cat.color}30` } : {}}
                >
                  {cat.label}
                  <span
                    className={`text-[10px] font-black rounded-full px-2 py-0.5 ${
                      isActive ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {counts[cat.id]}
                  </span>
                </button>
              );
            })}

            {/* Results count (right-aligned) */}
            <div className="ml-auto hidden sm:flex items-center gap-2 text-gray-400 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* ── Masonry grid ─────────────────────────────────────────────────── */}
          {filtered.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
              {filtered.map((img, i) => {
                const catColor = CAT_COLOR[img.category];
                return (
                  <div
                    key={img.src + activeCat}
                    className="break-inside-avoid mb-5 group relative rounded-2xl overflow-hidden cursor-zoom-in shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                    onClick={() => setLightbox(i)}
                  >
                    {/* Image */}
                    <div className={`relative ${img.aspect} overflow-hidden`}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-400" />

                      {/* Top-right: category badge */}
                      <div
                        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                        style={{ background: `${catColor}dd` }}
                      >
                        {img.category}
                      </div>

                      {/* Top-left: photo index */}
                      <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-white text-[10px] font-black">{i + 1}</span>
                      </div>

                      {/* Center: zoom icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/25 shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10.5 7.5v6m3-3h-6" />
                          </svg>
                        </div>
                      </div>

                      {/* Bottom: caption (slides up on hover) */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                        <div
                          className="w-6 h-[2px] mb-2"
                          style={{ background: catColor }}
                        />
                        <p className="text-white font-black text-sm leading-tight">{img.title}</p>
                        <p className="text-white/55 text-xs mt-1 leading-tight">{img.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-gray-400 text-sm">No images in this category.</p>
            </div>
          )}

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: "#080C18" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.013) 0px, rgba(255,255,255,0.013) 1px, transparent 1px, transparent 56px)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(700px circle at 50% 50%, rgba(204,33,40,0.10) 0%, transparent 60%)" }} />
        <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-primary/40 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-primary/40 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-primary/60" />
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">Start Today</span>
            <span className="h-px w-10 bg-primary/60" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Ready to Train<br />
            <span className="text-primary">Your Team?</span>
          </h2>

          <p className="text-white/40 text-base max-w-sm mx-auto mb-10 leading-relaxed">
            Get a customised EHS training proposal within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-primary text-white text-sm font-black px-8 py-4 rounded-full hover:bg-red-700 transition-all shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02]"
            >
              Enquire Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5" />
              </svg>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-semibold transition-colors"
            >
              Explore Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          LIGHTBOX
      ═══════════════════════════════════════════════════════════════════════ */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[300] flex flex-col"
          style={{ background: "rgba(4,6,15,0.97)", backdropFilter: "blur(20px)" }}
          onClick={close}
        >
          {/* ── Top bar ── */}
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0 border-b border-white/[0.06]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              {/* Counter pill */}
              <div className="bg-white/[0.08] border border-white/[0.10] rounded-full px-4 py-1.5 text-white text-xs font-black tracking-widest">
                {lightbox + 1} / {filtered.length}
              </div>
              {/* Category badge */}
              <span
                className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white hidden sm:inline"
                style={{ background: `${CAT_COLOR[filtered[lightbox].category]}cc` }}
              >
                {filtered[lightbox].category}
              </span>
            </div>

            {/* Keyboard hint */}
            <div className="hidden md:flex items-center gap-2 text-white/25 text-[10px] font-medium">
              <kbd className="px-1.5 py-0.5 bg-white/[0.06] rounded border border-white/10">←</kbd>
              <kbd className="px-1.5 py-0.5 bg-white/[0.06] rounded border border-white/10">→</kbd>
              <span>navigate</span>
              <span className="mx-1 opacity-40">·</span>
              <kbd className="px-1.5 py-0.5 bg-white/[0.06] rounded border border-white/10">Esc</kbd>
              <span>close</span>
            </div>

            {/* Close */}
            <button
              onClick={close}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all duration-200"
              aria-label="Close lightbox"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ── Image + arrows ── */}
          <div
            className="flex items-center gap-3 sm:gap-5 flex-1 min-h-0 px-3 sm:px-6 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev */}
            <button
              onClick={prev}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all duration-200 flex-shrink-0"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative flex-1 h-full rounded-xl overflow-hidden">
              <Image
                key={`${lightbox}-${activeCat}`}
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>

            {/* Next */}
            <button
              onClick={next}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all duration-200 flex-shrink-0"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* ── Caption ── */}
          <div
            className="flex-shrink-0 px-6 py-2 text-center border-t border-white/[0.05]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white font-black text-sm tracking-tight">{filtered[lightbox].title}</p>
            <p className="text-white/35 text-xs mt-0.5">{filtered[lightbox].desc}</p>
          </div>

          {/* ── Thumbnail strip ── */}
          <div
            className="flex-shrink-0 py-4 px-4 flex items-center justify-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {filtered.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className={`relative rounded-xl overflow-hidden flex-shrink-0 transition-all duration-200 ${
                  i === lightbox
                    ? "w-20 h-14 sm:w-24 sm:h-16 ring-2 ring-white opacity-100 scale-110"
                    : "w-16 h-11 sm:w-20 sm:h-14 opacity-35 hover:opacity-60"
                }`}
                aria-label={`Go to photo ${i + 1}`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="96px" />
                {/* Active indicator color bar */}
                {i === lightbox && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: CAT_COLOR[img.category] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}