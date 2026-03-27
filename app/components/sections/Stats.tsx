"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 10000,
    suffix: "+",
    label: "Professionals Trained",
    description: "Across industries nationwide",
    accent: "red" as const,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    value: 15,
    suffix: "+",
    label: "Years of Excellence",
    description: "Established & trusted since 2008",
    accent: "green" as const,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    value: 3,
    suffix: "",
    label: "ISO Certifications",
    description: "9001 · 14001 · OHSAS 45001",
    accent: "green" as const,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    value: 100,
    suffix: "%",
    label: "Compliance Rate",
    description: "Internationally recognized standards",
    accent: "red" as const,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatCard({ stat, index, active }: { stat: (typeof stats)[0]; index: number; active: boolean }) {
  const count   = useCountUp(stat.value, 1600 + index * 100, active);
  const display = stat.value >= 1000 ? count.toLocaleString() : count;
  const isGreen = stat.accent === "green";

  const lineColor  = isGreen ? "bg-secondary" : "bg-primary";
  const iconColor  = isGreen ? "text-secondary/70 group-hover:text-secondary" : "text-primary/70 group-hover:text-primary";
  const suffixColor = isGreen ? "text-secondary" : "text-primary";
  const glowColor  = isGreen
    ? "radial-gradient(400px circle at 50% 110%, rgba(37,126,67,0.09), transparent 70%)"
    : "radial-gradient(400px circle at 50% 110%, rgba(204,33,40,0.07), transparent 70%)";

  return (
    <div className="group relative flex flex-col items-start gap-4 px-8 py-10 overflow-hidden transition-all duration-300 hover:bg-white/[0.03]">
      {/* top accent line */}
      <div
        className={`absolute top-0 left-8 right-8 h-[2px] ${lineColor} origin-left transition-transform duration-500`}
        style={{ transform: active ? "scaleX(1)" : "scaleX(0)", transitionDelay: `${index * 120}ms` }}
      />
      {/* icon */}
      <div className={`${iconColor} transition-colors duration-300`}>{stat.icon}</div>
      {/* number */}
      <div>
        <p className="text-3xl sm:text-4xl font-black text-white leading-none tracking-tight tabular-nums">
          {display}
          <span className={suffixColor}>{stat.suffix}</span>
        </p>
      </div>
      {/* label */}
      <div>
        <p className="text-white font-semibold text-sm sm:text-base leading-snug">{stat.label}</p>
        <p className="text-gray-500 text-xs mt-1">{stat.description}</p>
      </div>
      {/* hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: glowColor }}
      />
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-dark overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-white/8" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />
      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/8">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} active={active} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/8" />
    </section>
  );
}
