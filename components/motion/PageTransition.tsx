"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplash } from "@/components/layout/SiteShell";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mounted fresh on every route change (via app/template.tsx): the new page
 * slides up and fades in, then ScrollTrigger positions are recalculated.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { splashDone } = useSplash();

  useEffect(() => {
    const el = ref.current;
    if (!el || !splashDone) return;
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", clearProps: "transform", onComplete: () => ScrollTrigger.refresh() },
    );
    return () => {
      tween.kill();
    };
  }, [splashDone]);

  return (
    <div ref={ref} className="min-h-full">
      {children}
    </div>
  );
}
