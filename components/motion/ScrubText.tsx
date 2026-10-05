"use client";

import { useEffect, useRef, type ElementType, type Ref } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Words that take the brand gradient once lit. */
  accent?: readonly string[];
  /** Viewport band the scrub runs across, e.g. ["top 85%", "top 35%"]. */
  range?: [string, string];
};

/**
 * Paragraph-scale scrub reveal: words start legible and brighten to full as
 * the block travels up the viewport. Fully lit well before the reader reaches
 * the end of the paragraph so nothing is left dim.
 */
export function ScrubText({ text, as = "p", className, accent = [], range = ["top 92%", "top 50%"] }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-w]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.45 },
        {
          opacity: 1,
          stagger: 0.55 / Math.max(words.length, 1),
          ease: "none",
          scrollTrigger: { trigger: el, start: range[0], end: range[1], scrub: 0.6 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [range]);

  const clean = (w: string) => w.replace(/[^\p{L}\p{N}]/gu, "");
  const Tag = as as ElementType<{ className?: string; ref?: Ref<HTMLElement> }>;
  return (
    <Tag ref={ref} className={cn("flex flex-wrap gap-x-[0.28em]", className)}>
      {text.split(/\s+/).map((w, i) => (
        <span key={`${w}-${i}`} data-w className={cn("inline-block", accent.includes(clean(w)) && "ciq-gradient-text")}>
          {w}
        </span>
      ))}
    </Tag>
  );
}
