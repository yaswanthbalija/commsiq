"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/motion/TextReveal";
import { lifecycle } from "@/lib/content/home";

gsap.registerPlugin(ScrollTrigger);

const TONES = [
  "from-[#ff2d8b]/25 to-transparent",
  "from-[#9b4dff]/25 to-transparent",
  "from-[#2da8ff]/25 to-transparent",
  "from-[#25d366]/20 to-transparent",
  "from-[#ffb020]/20 to-transparent",
];

/**
 * Five lifecycle stages as sticky cards that stack as you scroll; each card
 * that has been read settles back and dims so the newest stage leads.
 */
export function LifecycleStack() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const cards = section.querySelectorAll<HTMLElement>("[data-card]");
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card, {
          scale: 0.94,
          filter: "brightness(0.55)",
          ease: "none",
          scrollTrigger: { trigger: next, start: "top 85%", end: "top 20%", scrub: true },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="lifecycle" ref={root} className="relative bg-[#050508] py-24 text-white md:py-32">
      <div className="kx-container">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--ciq-pink)]">Lifecycle</p>
            <TextReveal
              text={lifecycle.headline}
              accent={["Complete"]}
              className="mt-4 text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]"
            />
            <ol className="mt-10 flex flex-wrap items-center gap-2 text-[13px] font-semibold text-white/60">
              {lifecycle.stages.map((s, i) => (
                <li key={s.title} className="flex items-center gap-2">
                  <span className="rounded-full border border-white/12 px-3 py-1">{s.title}</span>
                  {i < lifecycle.stages.length - 1 ? <span className="h-px w-4 bg-white/25" aria-hidden /> : null}
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-6">
            {lifecycle.stages.map((stage, i) => (
              <article
                key={stage.title}
                data-card
                className={`sticky overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b14] bg-gradient-to-br p-8 shadow-[0_40px_80px_-30px_rgba(5,5,8,0.9)] will-change-transform md:p-10 ${TONES[i % TONES.length]}`}
                style={{ top: `${112 + i * 18}px` }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] font-semibold tabular-nums tracking-[0.2em] text-white/45">
                    Stage 0{i + 1}
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/45">{stage.items.length} capabilities</span>
                </div>
                <h3 className="mt-10 text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold leading-none tracking-[-0.03em]">{stage.title}</h3>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {stage.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white/85">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--ciq-pink)]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
