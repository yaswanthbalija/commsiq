"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChannelLogo, channelKeyFor } from "@/components/ui/ChannelLogo";
import { TextReveal } from "@/components/motion/TextReveal";
import { journeyStory } from "@/lib/content/home";

gsap.registerPlugin(ScrollTrigger);

/** Node positions in a 1200×620 viewBox; the path is a smooth curve through them. */
const NODES = [
  { x: 90, y: 120 },
  { x: 380, y: 470 },
  { x: 620, y: 150 },
  { x: 870, y: 480 },
  { x: 1120, y: 200 },
] as const;

function smoothPath(pts: readonly { x: number; y: number }[]) {
  const d: string[] = [`M ${pts[0].x} ${pts[0].y}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d.push(`C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`);
  }
  return d.join(" ");
}

/**
 * "From Communication to Conversation": the customer's route draws itself as
 * you scroll and each moment lights up on the line — the journey story told as
 * a scroll-driven diagram, not a device.
 */
export function JourneyPath() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const path = section.querySelector<SVGPathElement>("[data-path]");
    const glow = section.querySelector<SVGPathElement>("[data-glow]");
    const nodes = section.querySelectorAll<HTMLElement>("[data-node]");
    if (!path || !glow) return;
    const len = path.getTotalLength();
    [path, glow].forEach((p) => {
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 60%", end: "bottom 70%", scrub: 0.6 } });
      tl.to([path, glow], { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);
      nodes.forEach((n, i) => {
        const at = i / (nodes.length - 1);
        tl.fromTo(n, { opacity: 0, scale: 0.6, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.08, ease: "back.out(2)" }, Math.max(0, at - 0.03));
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const d = smoothPath(NODES);

  return (
    <section id="journey" ref={root} className="relative overflow-hidden bg-[#08080f] py-24 text-white md:py-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="ciq-glow ciq-glow--purple left-[30%] top-[20%] h-[50vh] w-[50vh]" />
      </div>
      <div className="kx-container relative">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--ciq-blue)]">Journey</p>
            <TextReveal
              text={journeyStory.headline}
              accent={["Conversation"]}
              className="mt-4 text-[clamp(2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02] tracking-[-0.02em]"
            />
          </div>
          <div>
            <p className="text-xl font-semibold text-white">{journeyStory.subhead}</p>
            <p className="mt-3 max-w-lg text-[15px] leading-7 text-white/65">{journeyStory.body}</p>
          </div>
        </div>

        {/* diagram */}
        <div className="relative mt-16 hidden aspect-[1200/620] w-full md:block">
          <svg viewBox="0 0 1200 620" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id="journey-grad" x1="0" x2="1">
                <stop offset="0" stopColor="#ff2d8b" />
                <stop offset="0.5" stopColor="#9b4dff" />
                <stop offset="1" stopColor="#2da8ff" />
              </linearGradient>
            </defs>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 10" />
            <path data-glow d={d} fill="none" stroke="url(#journey-grad)" strokeWidth="14" strokeLinecap="round" opacity="0.25" style={{ filter: "blur(10px)" }} />
            <path data-path d={d} fill="none" stroke="url(#journey-grad)" strokeWidth="3" strokeLinecap="round" />
          </svg>
          {journeyStory.steps.map((step, i) => {
            const n = NODES[i];
            const above = n.y < 300;
            return (
              <div
                key={step.label}
                data-node
                className="absolute w-[240px]"
                style={{ left: `${(n.x / 1200) * 100}%`, top: `${(n.y / 620) * 100}%`, transform: `translate(-50%, ${above ? "-100%" : "0"})` }}
              >
                <div className={above ? "flex flex-col-reverse items-center" : "flex flex-col items-center"}>
                  <span className="relative my-3 flex h-4 w-4 items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-white/30 blur-[3px]" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
                  </span>
                  <div className="w-full rounded-2xl border border-white/10 bg-[#0b0b14]/90 p-4 text-center shadow-[0_24px_60px_-20px_rgba(5,5,8,0.9)] backdrop-blur">
                    <div className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                      {(() => {
                        const key = channelKeyFor(step.channel);
                        return key ? <ChannelLogo channel={key} size="sm" /> : null;
                      })()}
                      {step.channel}
                    </div>
                    <p className="mt-2 text-[13px] leading-6 text-white/85">{step.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* mobile: vertical list */}
        <ol className="mt-12 space-y-4 border-l border-white/10 pl-6 md:hidden">
          {journeyStory.steps.map((step, i) => (
            <li key={step.label} className="relative">
              <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-white" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                0{i + 1} · {step.channel}
              </p>
              <p className="mt-1 text-[14px] leading-6 text-white/85">{step.label}</p>
            </li>
          ))}
        </ol>

        <p className="mt-16 text-center text-[clamp(1.4rem,2.6vw,2.2rem)] font-extrabold tracking-tight">
          <span className="ciq-gradient-text">{journeyStory.closing}</span>
        </p>
      </div>
    </section>
  );
}
