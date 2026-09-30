"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_SELECTOR = "h2, h3, .grid > *, ol > li, details, [data-reveal]";

type Props = {
  children: ReactNode;
  className?: string;
  selector?: string;
};

/**
 * Batch scroll reveal for long content pages. Matches headings, grid cells and
 * list items inside the wrapper; nested matches are skipped so a card and its
 * heading do not both animate.
 */
export function AutoReveal({ children, className, selector = DEFAULT_SELECTOR }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const all = Array.from(root.querySelectorAll<HTMLElement>(selector));
    const matched = new Set(all);
    const targets = all.filter((el) => {
      if (el.closest(".ciq-split")) return false; // TextReveal handles its own words
      let parent = el.parentElement;
      while (parent && parent !== root) {
        if (matched.has(parent)) return false;
        parent = parent.parentElement;
      }
      return true;
    });
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 36 });
      ScrollTrigger.batch(targets, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.07, ease: "power3.out", overwrite: true }),
      });
    }, root);
    return () => ctx.revert();
  }, [selector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
