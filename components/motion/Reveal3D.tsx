"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  /** Selector for the items to animate; defaults to direct children. */
  selector?: string;
  stagger?: number;
  /** Tilt in degrees the items start from. */
  tilt?: number;
};

/**
 * Cards rise and un-tilt into place (perspective reveal), staggered.
 * Equivalent of mediakart's `mxd-reveal3d` / `animate-card` entrance.
 */
export function Reveal3D({ children, className, selector, stagger = 0.08, tilt = 18 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = selector
      ? root.querySelectorAll<HTMLElement>(selector)
      : (Array.from(root.children) as HTMLElement[]);
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 56, rotateX: tilt, transformOrigin: "50% 0%", transformPerspective: 900 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger,
            ease: "power3.out",
            overwrite: true,
          }),
      });
    }, root);
    return () => ctx.revert();
  }, [selector, stagger, tilt]);

  return (
    <div ref={ref} className={cn("[perspective:1200px]", className)}>
      {children}
    </div>
  );
}
