"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/motion/TextReveal";
import { whyCommsiq } from "@/lib/content/home";
import { cn } from "@/lib/utils";
import { SceneAnalytics, SceneApi, SceneAutomation, SceneConversation, SceneConverge, SceneEnterprise, SceneJourney } from "./WhyScenes";

gsap.registerPlugin(ScrollTrigger);

type Look = { scene: ReactNode; accent: string; wide?: boolean };

const LOOKS: Look[] = [
  { scene: <SceneConverge />, accent: "#9b4dff", wide: true },
  { scene: <SceneJourney />, accent: "#ff2d8b" },
  { scene: <SceneConversation />, accent: "#25d366" },
  { scene: <SceneApi />, accent: "#2da8ff" },
  { scene: <SceneAutomation />, accent: "#9b4dff" },
  { scene: <SceneAnalytics />, accent: "#ff2d8b", wide: true },
  { scene: <SceneEnterprise />, accent: "#25d366" },
];

/** Bento grid of differentiators — every card carries a live micro-scene that demonstrates the point. */
export function WhyGrid() {
  const grid = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 60, rotateX: -12, transformOrigin: "50% 0%" },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 80%" } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const track = (e: MouseEvent<HTMLLIElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="why" className="relative overflow-hidden bg-[#08080f] py-24 text-white md:py-32">
      {/* aurora */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="ciq-glow absolute -left-[10%] top-[10%] h-[520px] w-[520px] rounded-full bg-[#9b4dff]/40 blur-[140px]" />
        <span className="ciq-glow absolute right-[-8%] top-[40%] h-[560px] w-[560px] rounded-full bg-[#ff2d8b]/30 blur-[150px]" style={{ animationDelay: "-6s" }} />
        <span className="ciq-glow absolute bottom-[-10%] left-[30%] h-[480px] w-[480px] rounded-full bg-[#2da8ff]/30 blur-[140px]" style={{ animationDelay: "-12s" }} />
      </div>

      <div className="kx-container relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--ciq-purple)]">{whyCommsiq.headline}</p>
            <TextReveal
              text={whyCommsiq.subhead}
              accent={["infrastructure"]}
              className="mt-4 max-w-2xl text-[clamp(2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02] tracking-[-0.02em]"
            />
          </div>
          <p className="max-w-sm text-[15px] leading-7 text-white/60">Seven reasons enterprises choose commsIQ over point solutions and single-channel vendors.</p>
        </div>

        <ul ref={grid} className="mt-14 grid gap-5 [perspective:1400px] sm:grid-cols-2 lg:grid-cols-4">
          {whyCommsiq.points.map((p, i) => {
            const look = LOOKS[i % LOOKS.length];
            return (
              <li
                key={p.title}
                onMouseMove={track}
                style={{ "--accent": look.accent } as React.CSSProperties}
                className={cn(
                  "group relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0b0b14]/90 p-7 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-[var(--accent)]/60 hover:shadow-[0_30px_80px_-30px_var(--accent)]",
                  look.wide && "lg:col-span-2",
                )}
              >
                {/* accent wash + cursor spotlight */}
                <span className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "radial-gradient(120% 80% at 100% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 60%)" }} aria-hidden />
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--accent) 28%, transparent), transparent 60%)" }}
                  aria-hidden
                />
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-70" aria-hidden />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[12px] font-semibold tracking-[0.2em] text-white/45">0{i + 1}</span>
                    <span className="h-2 w-2 rounded-full" style={{ background: look.accent, boxShadow: `0 0 14px ${look.accent}` }} aria-hidden />
                  </div>
                  <div className="mt-6">{look.scene}</div>
                  <h3 className="mt-7 text-[1.35rem] font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-white/65">{p.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
