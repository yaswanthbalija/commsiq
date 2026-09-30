"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
  glare?: boolean;
};

/** Pointer-following 3D tilt with a soft light glare. */
export function TiltCard({ children, className, max = 7, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    gsap.to(el, {
      rotateY: (px - 0.5) * max * 2,
      rotateX: (0.5 - py) * max * 2,
      scale: 1.015,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 900,
    });
    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 1,
        background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.22), transparent 55%)`,
        duration: 0.3,
      });
    }
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.6)" });
    if (glareRef.current) gsap.to(glareRef.current, { opacity: 0, duration: 0.4 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("relative will-change-transform [transform-style:preserve-3d]", className)}
    >
      {children}
      {glare ? (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light"
        />
      ) : null}
    </div>
  );
}
