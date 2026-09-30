"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Replay the scene every time it re-enters the viewport. */
  replay?: boolean;
};

/**
 * Arms `.live-*` CSS scene animations (see globals.css) when the visual is in view.
 * Children stay server-renderable; only the wrapper is a client component.
 */
export function LiveScene({ children, className, replay = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-live");
            if (!replay) io.disconnect();
          } else if (replay) {
            el.classList.remove("is-live");
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [replay]);

  return (
    <div ref={ref} data-live className={cn("contents-none", className)}>
      {children}
    </div>
  );
}
