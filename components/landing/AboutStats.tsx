"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrubText } from "@/components/motion/ScrubText";
import { TextReveal } from "@/components/motion/TextReveal";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { about, trustStats } from "@/lib/content/home";

gsap.registerPlugin(ScrollTrigger);

/**
 * Who we are: the narrative lights up as it scrolls; the numbers flip in and
 * count up; the three differentiators read as a numbered manifesto.
 */
export function AboutStats() {
  const stats = useRef<HTMLDListElement>(null);
  const [count, setCount] = useState(false);

  useEffect(() => {
    const el = stats.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { rotateX: 90, opacity: 0, transformOrigin: "50% 0%" },
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", onEnter: () => setCount(true) },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative bg-[#08080f] py-24 text-white md:py-32">
      <div className="kx-container">
        <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--ciq-pink)]">About commsIQ</p>
        <TextReveal
          text={about.headline}
          accent={["Connect,", "Engage,", "Converse,", "Convert."]}
          className="mt-4 max-w-5xl text-[clamp(2rem,4.6vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]"
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            {about.narrative.map((para) => (
              <ScrubText key={para} text={para} className="text-[clamp(1.05rem,1.6vw,1.35rem)] leading-[1.6] text-white" />
            ))}
          </div>

          <div>
            <dl ref={stats} className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 [perspective:1200px]">
              {trustStats.map((s) => (
                <div key={s.label} className="bg-[#0b0b14] p-6">
                  <dd className="text-[clamp(2.4rem,4vw,3.6rem)] font-extrabold leading-none tracking-tight">
                    <AnimatedNumber value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} start={count} />
                  </dd>
                  <dt className="mt-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50">{s.label}</dt>
                </div>
              ))}
            </dl>

            <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {about.differentiators.map((d, i) => (
                <li key={d.eyebrow} className="grid gap-2 py-5 md:grid-cols-[110px_1fr]">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--ciq-pink)]">
                    0{i + 1} · {d.eyebrow}
                  </span>
                  <div>
                    <p className="text-lg font-bold tracking-tight">{d.title}</p>
                    <p className="mt-1 text-[14px] leading-6 text-white/60">{d.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
