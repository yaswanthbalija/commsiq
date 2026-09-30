"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

/** Wrapper that makes its child lean toward the cursor and snap back — for primary CTAs. */
export function Magnetic({ children, className, strength = 0.35 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    gsap.to(el, { x, y, duration: 0.5, ease: "power3.out" });
  };
  const leave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.45)" });
  };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={cn("inline-block will-change-transform", className)}>
      {children}
    </div>
  );
}
