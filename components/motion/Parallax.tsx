"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  /** Pixels of travel across the viewport; negative moves against scroll. */
  distance?: number;
  /** Optional scale-in on entry. */
  scaleFrom?: number;
};

/** Scroll-scrubbed vertical drift, for device mockups and visuals. */
export function Parallax({ children, className, distance = -60, scaleFrom }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -distance / 2, scale: scaleFrom ?? 1 },
        {
          y: distance / 2,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [distance, scaleFrom]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
