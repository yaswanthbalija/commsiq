"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bindReveal } from "@/components/motion/bindReveal";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger child selectors */
  childSelector?: string;
  y?: number;
  scrub?: boolean | number;
};

/** Batch scroll-reveal for section children — content-linked entrance. */
export function ScrollReveal({
  children,
  className,
  childSelector = "[data-reveal]",
  y = 40,
  scrub = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>(childSelector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      if (scrub) {
        gsap.fromTo(
          targets,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 80%", end: "top 30%", scrub: typeof scrub === "number" ? scrub : true },
          },
        );
        return;
      }
      const tween = gsap.fromTo(
        targets,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out", paused: true },
      );
      bindReveal(tween, root);
    }, root);

    return () => ctx.revert();
  }, [childSelector, y, scrub]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
