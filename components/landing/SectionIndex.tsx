"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "platform", label: "Platform" },
  { id: "products", label: "Products" },
  { id: "journey", label: "Journey" },
  { id: "lifecycle", label: "Lifecycle" },
  { id: "why", label: "Why commsIQ" },
  { id: "industries", label: "Industries" },
  { id: "about", label: "About" },
  { id: "brands", label: "Brands" },
  { id: "growth", label: "Growth Stack" },
  { id: "contact", label: "Contact" },
] as const;

/** Fixed chapter index on the right edge; highlights the section in view. */
export function SectionIndex() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.1, 0.5] },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className={cn(
        "pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 transition-opacity duration-500 xl:flex",
        active ? "opacity-100" : "opacity-0",
      )}
    >
      {SECTIONS.map((s, i) => {
        const on = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group pointer-events-auto flex items-center justify-end gap-3 text-right"
          >
            <span className={cn("text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300", on ? "translate-x-0 text-white opacity-100" : "translate-x-2 text-white/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100")}>
              {String(i + 1).padStart(2, "0")} {s.label}
            </span>
            <span
              className={cn("h-px transition-all duration-500", on ? "w-8" : "w-4 bg-white/25 group-hover:bg-white/60")}
              style={on ? { background: ["#ff2d8b", "#9b4dff", "#2da8ff"][i % 3] } : undefined}
            />
          </a>
        );
      })}
    </nav>
  );
}
