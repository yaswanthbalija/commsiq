"use client";

import { useEffect, useMemo, useRef, type ElementType, type Ref } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplash } from "@/components/layout/SiteShell";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** "scroll" reveals when the element enters the viewport; "splash" reveals right after the intro. */
  trigger?: "scroll" | "splash";
  delay?: number;
  stagger?: number;
  /** Words to paint with the brand gradient. */
  accent?: readonly string[];
};

/**
 * Word-by-word masked reveal (each word slides up from a clipped line).
 * Same effect as SplitType + GSAP on mediakart.org, without the extra dependency.
 */
export function TextReveal({
  text,
  as = "h2",
  className,
  trigger = "scroll",
  delay = 0,
  stagger = 0.045,
  accent = [],
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { splashDone } = useSplash();
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (trigger === "splash" && !splashDone) return;

    const inner = el.querySelectorAll<HTMLElement>("[data-word]");
    const ctx = gsap.context(() => {
      // fromTo locks the start values at creation so a later cache re-parse
      // cannot turn the percent offset into a stray pixel translate.
      gsap.fromTo(
        inner,
        { yPercent: 110, y: 0, rotate: 3, opacity: 0 },
        {
          yPercent: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.9,
          stagger,
          delay,
          ease: "power4.out",
          immediateRender: true,
          ...(trigger === "scroll"
            ? { scrollTrigger: { trigger: el, start: "top 92%", once: true } }
            : {}),
        },
      );
    }, el);
    return () => ctx.revert();
  }, [trigger, splashDone, delay, stagger, words.length]);

  const Tag = as as ElementType<{ className?: string; "aria-label"?: string; ref?: Ref<HTMLElement> }>;
  const isAccent = (word: string) =>
    accent.some((a) => word.replace(/[.,]/g, "").toLowerCase() === a.replace(/[.,]/g, "").toLowerCase());

  return (
    <Tag ref={ref} className={cn("ciq-split", className)} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <span
            data-word
            className={cn("inline-block will-change-transform", isAccent(word) && "ciq-gradient-text")}
            style={{ opacity: 0 }}
          >
            {word}
          </span>
          {i < words.length - 1 ? "\u00a0" : null}
        </span>
      ))}
    </Tag>
  );
}
