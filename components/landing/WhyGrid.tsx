"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/motion/TextReveal";
import { whyCommsiq } from "@/lib/content/home";
import { cn } from "@/lib/utils";
import { SceneAnalytics, SceneApi, SceneAutomation, SceneConversation, SceneConverge, SceneEnterprise, SceneJourney } from "./WhyScenes";

gsap.registerPlugin(ScrollTrigger);

type Look = { scene: ReactNode; accent: string };

const LOOKS: Look[] = [
  { scene: <SceneConverge />, accent: "#9b4dff" },
  { scene: <SceneJourney />, accent: "#ff2d8b" },
  { scene: <SceneConversation />, accent: "#25d366" },
  { scene: <SceneApi />, accent: "#2da8ff" },
  { scene: <SceneAutomation />, accent: "#9b4dff" },
  { scene: <SceneAnalytics />, accent: "#ff2d8b" },
  { scene: <SceneEnterprise />, accent: "#2da8ff" },
];

const DESKTOP = "(min-width: 1024px)";

function useDesktop() {
  const [desktop, setDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const sync = () => {
      setDesktop(mq.matches);
      // Layout height changes once the variant mounts; re-measure triggers below.
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return desktop;
}

/**
 * Why commsIQ as a scroll-driven showcase. Desktop: a sticky stage on the left
 * crossfades between seven live scenes while the reasons scroll past on the
 * right with a progress rail. Mobile: one card per reason.
 */
export function WhyGrid() {
  const desktop = useDesktop();

  return (
    <section id="why" className="relative overflow-clip bg-[#08080f] py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="ciq-glow absolute -left-[10%] top-[10%] h-[520px] w-[520px] rounded-full bg-[#9b4dff]/35 blur-[140px]" />
        <span className="ciq-glow absolute right-[-8%] top-[45%] h-[560px] w-[560px] rounded-full bg-[#ff2d8b]/25 blur-[150px]" style={{ animationDelay: "-6s" }} />
        <span className="ciq-glow absolute bottom-[-10%] left-[30%] h-[480px] w-[480px] rounded-full bg-[#2da8ff]/25 blur-[140px]" style={{ animationDelay: "-12s" }} />
      </div>

      <div className="kx-container relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="ciq-logo-bar w-12" aria-hidden />
              <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/70">{whyCommsiq.headline}</p>
            </div>
            <TextReveal
              text={whyCommsiq.subhead}
              accent={["infrastructure"]}
              className="mt-4 max-w-2xl text-[clamp(2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02] tracking-[-0.02em]"
            />
          </div>
          <p className="max-w-sm text-[15px] leading-7 text-white/60">Seven reasons enterprises choose commsIQ over point solutions and single-channel vendors.</p>
        </div>

        {desktop === null ? null : desktop ? <Showcase /> : <Stack />}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- desktop */
function Showcase() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const rail = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const steps = el.querySelectorAll<HTMLElement>("[data-step]");
    const ctx = gsap.context(() => {
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 58%",
          end: "bottom 42%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      if (rail.current) {
        gsap.fromTo(
          rail.current,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 58%", end: "bottom 42%", scrub: 0.5 } },
        );
      }
    }, el);
    return () => ctx.revert();
  }, []);

  const accent = LOOKS[active].accent;

  return (
    <div className="mt-16 grid grid-cols-[1fr_1fr] gap-16">
      {/* sticky stage */}
      <div className="sticky top-28 self-start">
        <div
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b14]/90 p-8 transition-[box-shadow] duration-700"
          style={{ "--accent": accent, boxShadow: "0 40px 120px -40px var(--accent)" } as CSSProperties}
        >
          <span
            className="pointer-events-none absolute inset-0 transition-opacity duration-700"
            style={{ background: "radial-gradient(90% 70% at 100% 0%, color-mix(in srgb, var(--accent) 24%, transparent), transparent 60%)" }}
            aria-hidden
          />
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-colors duration-700" aria-hidden />

          <div className="relative flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.22em] text-white/55">
            <span>
              <span className="text-white">0{active + 1}</span> / 0{LOOKS.length}
            </span>
            <span className="flex items-center gap-2">
              <i className="h-1.5 w-1.5 rounded-full transition-colors duration-500" style={{ background: accent }} aria-hidden />
              {whyCommsiq.points[active].title}
            </span>
          </div>

          <div className="relative mt-8 h-[300px]">
            {LOOKS.map((look, i) => {
              const on = i === active;
              return (
                <div
                  key={i}
                  aria-hidden={!on}
                  className={cn(
                    "absolute inset-0 flex items-center transition-[opacity,transform] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                    on ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-6 scale-[0.98] opacity-0",
                  )}
                >
                  <div className="w-full px-2">{look.scene}</div>
                </div>
              );
            })}
          </div>

          <div className="relative mt-8 flex gap-1.5" aria-hidden>
            {LOOKS.map((look, i) => (
              <span
                key={i}
                className="h-1 flex-1 rounded-full transition-colors duration-500"
                style={{ background: i <= active ? look.accent : "rgba(255,255,255,0.1)" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* reasons */}
      <div className="relative pl-10">
        <span className="absolute left-[7px] top-0 h-full w-px bg-white/10" aria-hidden />
        <span ref={rail} className="absolute left-[7px] top-0 h-full w-px origin-top bg-[linear-gradient(180deg,#ff2d8b,#9b4dff,#2da8ff)]" aria-hidden />
        <ol ref={list} className="pb-[14vh] pt-[4vh]">
          {whyCommsiq.points.map((p, i) => {
            const on = i === active;
            return (
              <li key={p.title} data-step className="flex min-h-[46vh] items-center">
                <button
                  type="button"
                  onClick={() => {
                    const step = list.current?.children[i] as HTMLElement | undefined;
                    step?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={cn(
                    "relative w-full text-left transition-[opacity,transform] duration-500",
                    on ? "translate-x-0 opacity-100" : "translate-x-0 opacity-35 hover:opacity-70",
                  )}
                >
                  <span
                    className="absolute -left-10 top-[0.7em] h-[15px] w-[15px] -translate-x-1/2 rounded-full border-2 border-[#08080f] transition-colors duration-500"
                    style={{ background: on ? LOOKS[i].accent : "rgba(255,255,255,0.25)" }}
                    aria-hidden
                  />
                  <span className="text-[12px] font-semibold uppercase tracking-[0.22em]" style={{ color: on ? LOOKS[i].accent : "rgba(255,255,255,0.5)" }}>
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 text-[clamp(1.8rem,2.6vw,2.4rem)] font-extrabold leading-[1.05] tracking-tight">{p.title}</h3>
                  <p className="mt-4 max-w-md text-[16px] leading-8 text-white/75">{p.body}</p>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ mobile */
function Stack() {
  return (
    <ul className="mt-12 space-y-4">
      {whyCommsiq.points.map((p, i) => {
        const look = LOOKS[i % LOOKS.length];
        return (
          <li
            key={p.title}
            style={{ "--accent": look.accent } as CSSProperties}
            className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0b0b14]/90 p-6"
          >
            <span className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 80% at 100% 0%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 60%)" }} aria-hidden />
            <div className="relative">
              <span className="text-[12px] font-semibold uppercase tracking-[0.22em]" style={{ color: look.accent }}>0{i + 1}</span>
              <div className="mt-5">{look.scene}</div>
              <h3 className="mt-6 text-[1.35rem] font-bold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-white/70">{p.body}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
