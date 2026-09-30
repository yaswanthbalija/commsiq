"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrowUpRight } from "@tabler/icons-react";
import { ChannelLogo } from "@/components/ui/ChannelLogo";
import { FlowSteps, splitFlow } from "@/components/ui/Flow";
import { ChannelMotif, type Motif } from "@/components/motion/ChannelMotif";
import { products } from "@/lib/content/home";
import { PRODUCT_VISUALS } from "./ProductVisuals";

gsap.registerPlugin(ScrollTrigger);

const FIELDS = [
  "from-[#0a2a6e] via-[#0b1234] to-[#050508]",
  "from-[#0b3d2e] via-[#07271f] to-[#050508]",
  "from-[#1a2a6e] via-[#2a1560] to-[#050508]",
  "from-[#5a0f3a] via-[#2a0b2e] to-[#050508]",
];

/**
 * Pinned horizontal track: vertical scroll drives the four channel panels
 * sideways. Each panel pairs the positioning copy with a live product window
 * (console, conversation, card carousel, call flow) built in code.
 */
export function ChannelTrack() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = root.current;
    const strip = track.current;
    if (!section || !strip) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const distance = () => strip.scrollWidth - section.clientWidth;
        gsap.to(strip, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => bar.current && gsap.set(bar.current, { scaleX: self.progress }),
          },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="products" ref={root} className="relative overflow-hidden bg-[#050508] text-white lg:h-[100svh]">
      <div className="kx-container pt-20 lg:absolute lg:inset-x-0 lg:top-12 lg:z-10 lg:pt-0">
        <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--ciq-pink)]">Products</p>
        <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,2.6rem)] font-extrabold tracking-tight">Every channel. One communication ecosystem.</h2>
      </div>

      <div ref={track} className="mt-12 flex flex-col lg:mt-0 lg:h-full lg:w-max lg:flex-row">
        {products.map((p, i) => (
          <article
            key={p.slug}
            data-panel
            className={`relative flex min-h-[70vh] w-full flex-col justify-end overflow-hidden border-t border-white/10 bg-gradient-to-br lg:h-full lg:w-screen lg:border-l lg:border-t-0 ${FIELDS[i % FIELDS.length]}`}
          >
            {/* faint generative field behind the product window */}
            <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
              <ChannelMotif kind={p.slug as Motif} />
            </div>
            <div className="pointer-events-none absolute right-[max(24px,calc((100vw-1280px)/2+24px))] top-[15%] hidden w-[min(42vw,600px)] lg:block" aria-hidden>
              <span className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_60%)] blur-2xl" />
              <div className="relative">{PRODUCT_VISUALS[p.slug]?.()}</div>
            </div>
            <span className="absolute left-6 top-6 text-[12px] font-semibold tabular-nums tracking-[0.2em] text-white/40 lg:left-[max(24px,calc((100vw-1280px)/2+24px))] lg:top-[9rem]">
              0{i + 1} / 0{products.length}
            </span>

            <div className="kx-container relative grid gap-10 pb-14 pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24">
              <div className="lg:hidden">{PRODUCT_VISUALS[p.slug]?.()}</div>
              <div>
                <div className="flex items-center gap-3">
                  <ChannelLogo channel={p.slug} size="md" />
                  <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/60">{p.title}</span>
                </div>
                <h3 className="mt-6 text-[clamp(2rem,4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">{p.subtitle}</h3>
                <p className="mt-5 max-w-lg text-[15px] leading-7 text-white/70 md:text-base">{p.description}</p>
                <Link href={p.href} className="btn-outline-light mt-8 inline-flex items-center gap-2">
                  Explore {p.title} <IconArrowUpRight size={16} />
                </Link>
              </div>
              <ul className="self-end divide-y divide-white/10 border-y border-white/10">
                {p.points.map((pt, j) => {
                  const flow = splitFlow(pt);
                  return (
                    <li key={pt} className="flex gap-5 py-5">
                      <span className="text-[12px] font-semibold tabular-nums text-white/40">0{j + 1}</span>
                      <span className="text-[15px] leading-7 text-white/85 md:text-[1.05rem]">
                        {flow.length ? <FlowSteps steps={flow} size="sm" tone="dark" /> : pt}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-6 bottom-6 hidden h-px bg-white/10 lg:block lg:inset-x-10">
        <div ref={bar} className="h-px origin-left scale-x-0 bg-[linear-gradient(90deg,var(--ciq-pink),var(--ciq-purple),var(--ciq-blue))]" />
      </div>
    </section>
  );
}
