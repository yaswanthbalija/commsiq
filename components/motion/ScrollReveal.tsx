"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: scrub ? undefined : 0.65,
          stagger: scrub ? 0 : 0.1,
          ease: scrub ? "none" : "power3.out",
          scrollTrigger: scrub
            ? {
                trigger: root,
                start: "top 80%",
                end: "top 30%",
                scrub: typeof scrub === "number" ? scrub : true,
              }
            : {
                trigger: root,
                start: "top 82%",
                once: true,
              },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [childSelector, y, scrub]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
