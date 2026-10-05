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

/**
 * Panel fields in the logo palette. SMS pink→purple, RCS blue→purple,
 * Voice purple→pink; WhatsApp keeps its own green so the channel reads.
 */
const FIELDS = [
  "from-[#5a1458] via-[#2c0f4a] to-[#0a0612]",
  "from-[#0b3d2e] via-[#07271f] to-[#050508]",
  "from-[#153f8c] via-[#1e1460] to-[#0a0612]",
  "from-[#3a1470] via-[#4d1047] to-[#0a0612]",
];

/** Share of the pinned distance spent holding the last panel so it can be read. */
const END_HOLD = 0.35;

/**
 * Pinned horizontal track: vertical scroll drives the four channel panels
 * sideways, then holds on the last one before releasing to the next section.
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
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance() * (1 + END_HOLD)}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => bar.current && gsap.set(bar.current, { scaleX: Math.min(1, self.progress * (1 + END_HOLD)) }),
          },
        });
        tl.to(strip, { x: () => -distance(), ease: "none", duration: 1 });
        tl.to({}, { duration: END_HOLD });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="products" ref={root} className="relative overflow-hidden bg-[#050508] text-white lg:h-[100svh]">
      <div className="kx-container pt-20 lg:absolute lg:inset-x-0 lg:top-12 lg:z-10 lg:pt-0">
        <div className="flex items-center gap-3">
          <span className="ciq-logo-bar w-12" aria-hidden />
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/70">Products</p>
        </div>
        <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,2.6rem)] font-extrabold tracking-tight">Every channel. One communication ecosystem.</h2>
      </div>

      <div ref={track} className="mt-12 flex flex-col will-change-transform lg:mt-0 lg:h-full lg:w-max lg:flex-row">
        {products.map((p, i) => (
          <article
            key={p.slug}
            data-panel
            className={`relative flex min-h-[70vh] w-full flex-col justify-end overflow-hidden border-t border-white/10 bg-gradient-to-br lg:h-full lg:w-screen lg:border-l lg:border-t-0 ${FIELDS[i % FIELDS.length]}`}
          >
            {/* faint generative field behind the product window */}
            <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
              <ChannelMotif kind={p.slug as Motif} />
            </div>
            <div className="pointer-events-none absolute right-[max(24px,calc((100vw-1280px)/2+24px))] top-[14%] hidden w-[min(44vw,640px)] lg:block" aria-hidden>
              <span className="absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_60%)] blur-2xl" />
              <div className="relative">{PRODUCT_VISUALS[p.slug]?.()}</div>
            </div>
            <span className="absolute left-6 top-6 text-[13px] font-semibold tabular-nums tracking-[0.2em] text-white/60 lg:left-[max(24px,calc((100vw-1280px)/2+24px))] lg:top-[9rem]">
              <span className="ciq-gradient-text text-[1.6rem] font-extrabold">0{i + 1}</span> / 0{products.length}
            </span>

            <div className="kx-container relative grid gap-10 pb-14 pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24">
              <div className="lg:hidden">{PRODUCT_VISUALS[p.slug]?.()}</div>
              <div>
                <div className="flex items-center gap-3">
                  <ChannelLogo channel={p.slug} size="md" />
                  <span className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/80">{p.title}</span>
                </div>
                <h3 className="mt-6 text-[clamp(2.2rem,4.6vw,4.2rem)] font-extrabold leading-[1.0] tracking-[-0.025em] text-white">{p.subtitle}</h3>
                <p className="mt-6 max-w-xl text-[17px] leading-8 text-white/85 md:text-[1.15rem]">{p.description}</p>
                <Link href={p.href} className="btn-pink mt-9 inline-flex items-center gap-2">
                  Explore {p.title} <IconArrowUpRight size={16} />
                </Link>
              </div>
              <ul className="self-end divide-y divide-white/15 border-y border-white/15">
                {p.points.map((pt, j) => {
                  const flow = splitFlow(pt);
                  return (
                    <li key={pt} className="flex gap-5 py-5">
                      <span className="pt-1 text-[13px] font-bold tabular-nums text-white/60">0{j + 1}</span>
                      <span className="text-[16px] leading-7 text-white md:text-[1.15rem] md:leading-8">
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

      <div className="pointer-events-none absolute inset-x-6 bottom-6 hidden h-[3px] overflow-hidden rounded-full bg-white/10 lg:block lg:inset-x-10">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-[linear-gradient(90deg,var(--ciq-pink),var(--ciq-purple),var(--ciq-blue))]" />
      </div>
    </section>
  );
}
