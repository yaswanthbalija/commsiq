"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { hero, contactCopy } from "@/lib/content/home";
import { useDemoModal } from "@/components/layout/DemoModal";
import { useSplash } from "@/components/layout/SiteShell";
import { Marquee } from "@/components/motion/Marquee";
import { RollText } from "@/components/motion/RollText";
import { TextReveal } from "@/components/motion/TextReveal";
import { FlowField } from "@/components/three/FlowField";
import { Magnetic } from "@/components/motion/Magnetic";

/**
 * Hero. Intro plays after splash. No section parallax so scrolling back
 * to the top does not leave the copy faded or offset.
 */
export function Hero() {
  const { openDemo } = useDemoModal();
  const { splashDone } = useSplash();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!splashDone) return;
    const section = root.current;
    if (!section) return;
    const bits = section.querySelectorAll<HTMLElement>("[data-bit]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(bits, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(bits, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3, overwrite: "auto" });
    }, section);
    return () => ctx.revert();
  }, [splashDone]);

  return (
    <section ref={root} className="relative z-0 flex min-h-[100dvh] flex-col overflow-hidden bg-[#050508]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%] opacity-70 md:opacity-100" aria-hidden>
        <FlowField />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(155,77,255,0.22),transparent_55%)]" aria-hidden />

      <div className="relative flex flex-1 flex-col">
        <div className="kx-container flex flex-1 flex-col justify-center pb-16 pt-32 md:pt-36">
          <div data-bit className="mb-6 flex items-center gap-3">
            <span className="ciq-logo-bar w-14" aria-hidden />
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/55">
              {contactCopy.brandLine} · CPaaS
            </p>
          </div>
          <TextReveal
            as="h1"
            text={hero.headline}
            trigger="splash"
            accent={["Intelligent"]}
            stagger={0.1}
            className="max-w-[16ch] text-[clamp(2.8rem,5.6vw,5.4rem)] font-extrabold leading-[0.96] tracking-[-0.03em] text-white"
          />
          <p data-bit className="mt-8 max-w-[560px] text-[15px] leading-7 text-white/70 md:text-[1.08rem] md:leading-8">
            {hero.subheadline}
          </p>
          <div data-bit className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <button type="button" onClick={() => openDemo("expert")} className="btn-pink">
                <RollText>{hero.primaryCta.label}</RollText>
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <button type="button" onClick={() => openDemo("demo")} className="btn-outline-light">
                <RollText>{hero.secondaryCta.label}</RollText>
              </button>
            </Magnetic>
          </div>
        </div>

        <div data-bit className="relative border-t border-white/10">
          <div className="kx-container py-4">
            <Marquee speed={46}>
              {contactCopy.channels.map((label) => (
                <span key={label} className="mx-6 inline-flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  {label}
                  <span className="flex gap-1" aria-hidden>
                    <i className="h-1.5 w-1.5 rounded-full bg-[var(--ciq-pink)]" />
                    <i className="h-1.5 w-1.5 rounded-full bg-[var(--ciq-purple)]" />
                    <i className="h-1.5 w-1.5 rounded-full bg-[var(--ciq-blue)]" />
                  </span>
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
