"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/ui/AnimateOnScroll";

const galleryImages = [
  { src: "/Training/ehs1.webp",        alt: "EHS Training Session 1" },
  { src: "/Training/ehs2.webp",        alt: "EHS Training Session 2" },
  { src: "/Training/ehs3.webp",        alt: "EHS Training Session 3" },
  { src: "/Training/ehs4.webp",        alt: "EHS Training Session 4" },
  { src: "/Training/ehs5.webp",        alt: "EHS Training Session 5" },
  { src: "/Training/ehs6.webp",        alt: "EHS Training Session 6" },
  { src: "/Gallery/training3-1.jpg",   alt: "ISDC Training Gallery" },
  { src: "/Gallery/service14.jpg",     alt: "ISDC Service Gallery" },
  { src: "/Gallery/events5-1.jpg",     alt: "ISDC Events Gallery" },
];

const mobileImages = galleryImages.slice(0, 5);

function ZoomIcon() {
  return (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export default function TrainingGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close  = useCallback(() => setLightbox(null), []);
  const prev   = useCallback(() => setLightbox(i => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null), []);
  const next   = useCallback(() => setLightbox(i => i !== null ? (i + 1) % galleryImages.length : null), []);

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

  // prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <section className="py-20 lg:py-28 bg-dark overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

          {/* header */}
          <AnimateOnScroll animation="fadeUp" className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Gallery</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white leading-[1.08] tracking-tight">
                Training <span className="text-accent">in Action</span>
              </h2>
              <p className="text-white text-sm mt-3 max-w-md leading-relaxed">
                Real professionals, real environments, real results.
              </p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-white hover:text-dark transition-all duration-300 flex-shrink-0 self-start sm:self-auto"
            >
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimateOnScroll>

          {/* ── Mobile: 5-image scroll slider ── */}
          <div className="sm:hidden overflow-x-auto snap-x snap-mandatory flex gap-3 -mx-6 px-6 pb-3 [&::-webkit-scrollbar]:hidden">
            {mobileImages.map((img, i) => (
              <div
                key={i}
                onClick={() => setLightbox(i)}
                className="snap-start shrink-0 w-[78vw] aspect-video rounded-xl overflow-hidden relative group cursor-pointer"
              >
                <Image src={img.src} alt={img.alt} fill loading="lazy" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/50 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ZoomIcon />
                  </div>
                </div>
              </div>
            ))}
            {/* View all teaser card */}
            <div className="snap-start shrink-0 w-[78vw] aspect-video rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[#12151f] border border-white/10 flex flex-col items-center justify-center gap-3">
                <p className="text-white font-black text-lg">See All Photos</p>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-full"
                >
                  Open Gallery
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Desktop: bento grid ── */}
          <div className="hidden sm:grid grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">

            {/* hero image — 2×2 */}
            <AnimateOnScroll animation="scaleIn" delay={0} className="col-span-2 row-span-2">
              <div
                onClick={() => setLightbox(0)}
                className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image src={galleryImages[0].src} alt={galleryImages[0].alt} fill loading="lazy" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/50 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ZoomIcon />
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* remaining images — 1×1 */}
            {galleryImages.slice(1).map((img, i) => (
              <AnimateOnScroll key={i} animation="scaleIn" delay={(i + 1) * 50} className="col-span-1 row-span-1">
                <div
                  onClick={() => setLightbox(i + 1)}
                  className="relative w-full h-full rounded-xl overflow-hidden group cursor-pointer"
                >
                  <Image src={img.src} alt={img.alt} fill loading="lazy" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ZoomIcon />
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}

          </div>

        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[300] flex flex-col"
          style={{ background: "rgba(0,0,0,0.96)", backdropFilter: "blur(14px)" }}
          onClick={close}
        >
          {/* top bar: counter + close */}
          <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" onClick={e => e.stopPropagation()}>
            <div className="bg-white/10 border border-white/10 rounded-full px-4 py-1.5 text-white text-xs font-bold tracking-widest">
              {lightbox + 1} / {galleryImages.length}
            </div>
            <button
              onClick={close}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-dark transition-all duration-200"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* middle row: left arrow + image + right arrow */}
          <div className="flex items-center gap-3 sm:gap-5 flex-1 min-h-0 px-3 sm:px-6" onClick={e => e.stopPropagation()}>
            {/* prev arrow */}
            <button
              onClick={prev}
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-dark transition-all duration-200 flex-shrink-0"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* image */}
            <div className="relative flex-1 h-full rounded-xl overflow-hidden">
              <Image
                key={lightbox}
                src={galleryImages[lightbox].src}
                alt={galleryImages[lightbox].alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>

            {/* next arrow */}
            <button
              onClick={next}
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-dark transition-all duration-200 flex-shrink-0"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* thumbnail strip — bottom */}
          <div className="flex-shrink-0 py-5 px-4 flex items-center justify-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden" onClick={e => e.stopPropagation()}>
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-200 cursor-pointer ${i === lightbox ? "ring-2 ring-white scale-110 opacity-100" : "opacity-40 hover:opacity-70"}`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
