"use client";

import { useEffect, useRef, useState } from "react";

export type AnimVariant = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scaleIn" | "fade";

const hidden: Record<AnimVariant, string> = {
  fadeUp:    "opacity-0 translate-y-10",
  fadeDown:  "opacity-0 -translate-y-10",
  fadeLeft:  "opacity-0 translate-x-10",   // enters from the right, moves left
  fadeRight: "opacity-0 -translate-x-10",  // enters from the left, moves right
  scaleIn:   "opacity-0 scale-95",
  fade:      "opacity-0",
};

const visible = "opacity-100 translate-x-0 translate-y-0 scale-100";

interface Props {
  children: React.ReactNode;
  animation?: AnimVariant;
  delay?: number;       // ms
  duration?: number;    // ms
  threshold?: number;   // 0–1
  className?: string;
}

export default function AnimateOnScroll({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 650,
  threshold = 0.12,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all ease-out will-change-transform ${
        inView ? visible : hidden[animation]
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: inView ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
