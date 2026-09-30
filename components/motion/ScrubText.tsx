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
 * Paragraph-scale scrub reveal: words sit dimmed and light up one after another
 * as the block travels through the viewport (mediakart "reveal-type").
 */
export function ScrubText({ text, as = "p", className, accent = [], range = ["top 88%", "top 40%"] }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-w]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        { opacity: 1, stagger: 0.6 / words.length, ease: "none", scrollTrigger: { trigger: el, start: range[0], end: range[1], scrub: 0.4 } },
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
