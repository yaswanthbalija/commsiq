"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrowDown } from "@tabler/icons-react";
import { hero, contactCopy } from "@/lib/content/home";
import { useDemoModal } from "@/components/layout/DemoModal";
import { useSplash } from "@/components/layout/SiteShell";
import { Marquee } from "@/components/motion/Marquee";
import { RollText } from "@/components/motion/RollText";
import { TextReveal } from "@/components/motion/TextReveal";
import { FlowField } from "@/components/three/FlowField";
import { HeroObject } from "@/components/three/HeroObject";
import { Magnetic } from "@/components/motion/Magnetic";

gsap.registerPlugin(ScrollTrigger);

/**
 * Full-viewport hero. Editorial headline over a GPU particle field. Pinned:
 * the next section slides over while the hero recedes and dims.
 */
export function Hero() {
  const { openDemo } = useDemoModal();
  const { splashDone } = useSplash();
  const root = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    if (!splashDone) return;
    const section = root.current;
    const content = inner.current;
    if (!section || !content) return;
    const ctx = gsap.context(() => {
      const bits = section.querySelectorAll<HTMLElement>("[data-bit]");
      gsap.set(bits, { y: 30, opacity: 0 });
      gsap.to(bits, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.5 });
      gsap.to(section, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true, onUpdate: (self) => (progress.current = self.progress) },
      });
      gsap.to(content, { opacity: 0.15, scale: 0.95, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true } });
    }, section);
    return () => ctx.revert();
  }, [splashDone]);

  return (
    <section ref={root} className="relative z-0 flex min-h-[100svh] flex-col overflow-hidden bg-[#050508] will-change-transform">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%] opacity-60 md:opacity-100" aria-hidden>
        <FlowField />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(155,77,255,0.18),transparent_55%)]" aria-hidden />
      {/* lit 3D core, right column on desktop */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[50%] lg:block" aria-hidden>
        <div className="absolute inset-0 bottom-[8%] right-[2%]">
          <HeroObject progressRef={progress} />
        </div>
      </div>

      <div ref={inner} className="relative flex flex-1 flex-col [transform-origin:50%_20%]">
        <div className="kx-container flex flex-1 flex-col justify-center pb-16 pt-32 md:pt-36 lg:max-w-none lg:pr-[46%]">
          <p data-bit className="mb-6 text-[12px] font-semibold uppercase tracking-[0.24em] text-white/55">
            {contactCopy.brandLine} · CPaaS
          </p>
          <TextReveal
            as="h1"
            text={hero.headline}
            trigger="splash"
            accent={["Intelligent"]}
            stagger={0.1}
            className="max-w-[14ch] text-[clamp(2.8rem,5.6vw,5.4rem)] font-extrabold leading-[0.96] tracking-[-0.03em] text-white"
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
          <div className="kx-container flex items-center gap-6 py-4">
            <span className="hidden shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 md:inline-flex">
              <IconArrowDown size={14} className="animate-bounce" /> Scroll
            </span>
            <Marquee speed={46} className="flex-1">
              {contactCopy.channels.map((label) => (
                <span key={label} className="mx-6 inline-flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  {label}
                  <span className="h-1 w-1 rounded-full bg-[var(--ciq-pink)]" aria-hidden />
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
