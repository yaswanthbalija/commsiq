"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { IconBroadcast, IconHandClick, IconMessages, IconTargetArrow, type Icon } from "@tabler/icons-react";
import { bindReveal } from "@/components/motion/bindReveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { TextReveal } from "@/components/motion/TextReveal";
import { platformPillars } from "@/lib/content/home";

/** One stage of the pipeline: icon + logo-palette tint. */
const STAGES: { Icon: Icon; tint: string }[] = [
  { Icon: IconBroadcast, tint: "#ff2d8b" },
  { Icon: IconHandClick, tint: "#b14bff" },
  { Icon: IconMessages, tint: "#6c7dff" },
  { Icon: IconTargetArrow, tint: "#2da8ff" },
];

/**
 * Manifesto + the four pillars as one connected pipeline (Reach → Convert).
 * A gradient rail runs across the top of the four stages with a travelling
 * pulse; each stage has a bold icon, a watermark numeral and its own tint.
 */
export function PillarsStatement() {
  const grid = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        el.children,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", paused: true },
      );
      bindReveal(tween, el, "top 85%");
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="platform" className="relative overflow-hidden bg-[#08080f] py-24 text-white md:py-36">
      {/* brand aurora */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="ciq-glow ciq-glow--purple -left-[12%] -top-[10%] h-[70vh] w-[70vh]" />
        <div className="ciq-glow ciq-glow--pink -right-[10%] top-[30%] h-[60vh] w-[60vh]" />
        <div className="ciq-glow ciq-glow--blue -bottom-[25%] left-[35%] h-[65vh] w-[65vh]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(155,77,255,0.10),transparent_45%)]" />
      </div>

      <div className="kx-container relative">
        <div className="flex items-center gap-3">
          <span className="ciq-logo-bar w-12" aria-hidden />
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/70">The platform</p>
        </div>
        <TextReveal
          text={platformPillars.headline}
          accent={["Connected"]}
          className="mt-5 max-w-4xl text-[clamp(2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02] tracking-[-0.02em]"
        />
        <ScrubText
          text={`${platformPillars.lead} ${platformPillars.body}`}
          className="mt-10 max-w-4xl text-[clamp(1.25rem,2.4vw,2rem)] font-medium leading-[1.35] text-white"
        />

        {/* pipeline */}
        <div className="relative mt-20 overflow-hidden rounded-[28px] border border-white/10 bg-[#0c0c18]/80">
          {/* rail */}
          <div className="relative h-[3px] w-full bg-[linear-gradient(90deg,#ff2d8b,#9b4dff,#2da8ff)]" aria-hidden>
            <span className="ciq-rail-pulse absolute top-1/2 h-[3px] w-[12%] -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_4px_rgba(255,255,255,0.55)]" />
          </div>

          <ol ref={grid} className="grid md:grid-cols-4 md:divide-x md:divide-white/10">
            {platformPillars.pillars.map((p, i) => {
              const { Icon, tint } = STAGES[i % STAGES.length];
              return (
                <li
                  key={p.title}
                  style={{ "--tint": tint } as CSSProperties}
                  className="group relative border-t border-white/10 p-8 transition-colors duration-500 hover:bg-white/[0.035] md:border-t-0 md:p-9"
                >
                  {/* watermark numeral */}
                  <span className="pointer-events-none absolute -right-2 -top-4 select-none text-[8.5rem] font-extrabold leading-none tracking-[-0.06em] text-white/[0.045] transition-colors duration-500 group-hover:text-[color-mix(in_srgb,var(--tint)_22%,transparent)]" aria-hidden>
                    {i + 1}
                  </span>

                  <span
                    className="relative flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-[0_18px_40px_-16px_var(--tint)] transition-transform duration-500 group-hover:-translate-y-1"
                    style={{ background: "linear-gradient(135deg, var(--tint), color-mix(in srgb, var(--tint) 35%, #0c0c18))" }}
                    aria-hidden
                  >
                    <Icon size={26} stroke={1.8} />
                  </span>

                  <p className="mt-10 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/50">Stage 0{i + 1}</p>
                  <h3 className="mt-2 text-[clamp(1.9rem,3vw,2.6rem)] font-extrabold tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-white/75">{p.body}</p>

                  <span className="mt-8 block h-[2px] w-12 rounded-full transition-[width] duration-500 group-hover:w-full" style={{ background: "var(--tint)" }} aria-hidden />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
