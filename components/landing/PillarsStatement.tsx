"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrubText } from "@/components/motion/ScrubText";
import { TextReveal } from "@/components/motion/TextReveal";
import { platformPillars } from "@/lib/content/home";

gsap.registerPlugin(ScrollTrigger);

/**
 * Manifesto + the four pillars. The lead sentence lights up word by word as it
 * scrolls; the pillars flip up from the floor in 3D, one after another.
 */
export function PillarsStatement() {
  const grid = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { rotateX: -70, y: 60, opacity: 0, transformOrigin: "50% 100%" },
        { rotateX: 0, y: 0, opacity: 1, duration: 1, stagger: 0.14, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 78%" } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="platform" className="relative bg-[#08080f] py-24 text-white md:py-36">
      <div className="kx-container">
        <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--ciq-pink)]">The platform</p>
        <TextReveal
          text={platformPillars.headline}
          accent={["Connected"]}
          className="mt-4 max-w-4xl text-[clamp(2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02] tracking-[-0.02em]"
        />
        <ScrubText
          text={`${platformPillars.lead} ${platformPillars.body}`}
          className="mt-10 max-w-4xl text-[clamp(1.25rem,2.4vw,2rem)] font-medium leading-[1.35] text-white"
        />

        <ol ref={grid} className="mt-20 grid gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 [perspective:1400px] md:grid-cols-4">
          {platformPillars.pillars.map((p, i) => (
            <li key={p.title} className="group relative bg-[#0b0b14] p-7 transition-colors duration-500 hover:bg-[#10101c] md:p-8">
              <span className="text-[12px] font-semibold tabular-nums tracking-[0.2em] text-white/40">0{i + 1}</span>
              <h3 className="mt-16 text-[clamp(1.9rem,3vw,2.6rem)] font-extrabold tracking-tight md:mt-24">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-white/65">{p.body}</p>
              <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,var(--ciq-pink),var(--ciq-purple),var(--ciq-blue))] transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
