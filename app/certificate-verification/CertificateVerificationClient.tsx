"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const certs = [
  { src: "/Certificate/C1.jpg" },
  { src: "/Certificate/C2.jpg" },
  { src: "/Certificate/C3.jpg" },
  { src: "/Certificate/ct1.jpg" },
  { src: "/Certificate/ct2.jpg" },
  { src: "/Certificate/ct3.jpg" },
  { src: "/Certificate/ct4.jpg" },
  { src: "/Certificate/ct5.jpg" },
];

const isoStrip = [
  { src: "/ISO-9001.webp", label: "ISO 9001" },
  { src: "/ISO-14001.webp", label: "ISO 14001" },
  { src: "/cert3.webp", label: "OHSAS 45001" },
];

export default function CertificateVerificationClient() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  function prev() {
    setLightbox((i) => (i === null ? null : (i - 1 + certs.length) % certs.length));
  }
  function next() {
    setLightbox((i) => (i === null ? null : (i + 1) % certs.length));
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-dark overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(10,10,20,0.97) 40%, rgba(10,10,20,0.80) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(600px circle at 20% 60%, rgba(204,33,40,0.12) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 56px)" }} />
        <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-primary/60 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-primary/60 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-2 text-xs text-white/40 font-medium mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Certificates</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="h-px w-8 bg-primary" />
                <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Nationally Recognised</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                Our <span className="text-primary">Certificates</span>
              </h1>
            </div>
          </div>

          {/* ISO strip */}
          <div className="flex items-center gap-4 flex-wrap mt-8">
            {isoStrip.map((iso) => (
              <div key={iso.label} className="flex items-center gap-3 bg-white/[0.06] border border-white/10 rounded-2xl px-4 py-3">
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image src={iso.src} alt={iso.label} fill className="object-contain" />
                </div>
                <span className="text-white text-xs font-bold">{iso.label}<br /><span className="text-white/50 font-normal">Certified</span></span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
          <div className="h-full w-1/4 bg-primary" />
        </div>
      </section>

      {/* ── CERTIFICATES GRID ── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {certs.map((cert, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={cert.src}
                    alt={`Certificate ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm text-dark text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                      </svg>
                      View
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: ["#cc2128","#257e43","#fe5a0e","#1a7a8a","#cc2128","#257e43","#fe5a0e","#1a7a8a"][i] }} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col"
          onClick={() => setLightbox(null)}
        >
          {/* top bar */}
          <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <span className="text-white/50 text-sm font-medium">{lightbox + 1} / {certs.length}</span>
            <button
              onClick={() => setLightbox(null)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* image + arrows */}
          <div className="flex-1 flex items-center gap-4 px-4 min-h-0" onClick={(e) => e.stopPropagation()}>
            <button onClick={prev} className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1 flex items-center justify-center min-h-0">
              <Image
                src={certs[lightbox].src}
                alt={`Certificate ${lightbox + 1}`}
                width={1200}
                height={900}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>
            <button onClick={next} className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* thumbnails */}
          <div className="flex-shrink-0 flex items-center gap-2 px-6 py-4 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
            {certs.map((c, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === lightbox ? "border-primary scale-110" : "border-transparent opacity-50 hover:opacity-80"}`}
              >
                <Image src={c.src} alt="" width={80} height={60} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
