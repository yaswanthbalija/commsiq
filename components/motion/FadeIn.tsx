"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bindReveal } from "@/components/motion/bindReveal";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll reveal for marketing sections.
 * GSAP (not Framer) so OS reduced-motion does not erase brand motion.
 */
export function FadeIn({ children, className, delay = 0, y = 24 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(el, { opacity: 0, y }, { opacity: 1, y: 0, duration: 0.55, delay, ease: "power2.out", paused: true });
      bindReveal(tween, el, "top 88%");
    }, el);

    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
