"use client";

import { useEffect, useMemo, useRef, type ElementType, type Ref } from "react";
import gsap from "gsap";
import { useSplash } from "@/components/layout/SiteShell";
import { bindReveal } from "@/components/motion/bindReveal";
import { cn } from "@/lib/utils";

/** Word mask with room for descenders (g, y, p) and ascenders; negative margins keep line-height unchanged. */
const MASK = "-mb-[0.24em] -mt-[0.1em] inline-block overflow-hidden pb-[0.24em] pt-[0.1em] align-bottom";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  trigger?: "scroll" | "splash";
  delay?: number;
  stagger?: number;
  accent?: readonly string[];
};

/**
 * Word-by-word masked reveal.
 * Scroll: plays when the heading enters, stays readable, replays after it
 * has fully left the viewport in either direction.
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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(inner, { yPercent: 0, opacity: 1 });
        return;
      }
      const tween = gsap.fromTo(
        inner,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger, delay, ease: "power4.out", paused: trigger === "scroll" },
      );
      if (trigger === "scroll") bindReveal(tween, el, "top 88%");
    }, el);
    return () => ctx.revert();
  }, [trigger, splashDone, delay, stagger, words.length]);

  const Tag = as as ElementType<{ className?: string; "aria-label"?: string; ref?: Ref<HTMLElement> }>;
  const isAccent = (word: string) =>
    accent.some((a) => word.replace(/[.,]/g, "").toLowerCase() === a.replace(/[.,]/g, "").toLowerCase());

  return (
    <Tag ref={ref} className={cn("ciq-split", className)} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className={MASK} aria-hidden>
          <span data-word className={cn("inline-block", isAccent(word) && "ciq-gradient-text")}>
            {word}
            {i < words.length - 1 ? "\u00a0" : null}
          </span>
        </span>
      ))}
    </Tag>
  );
}
