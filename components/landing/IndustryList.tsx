"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrowUpRight } from "@tabler/icons-react";
import { ChannelLogo, channelKeyFor } from "@/components/ui/ChannelLogo";
import { TextReveal } from "@/components/motion/TextReveal";
import { industries } from "@/lib/content/home";

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial index of industries. Rows slide in; on hover the row fills with a
 * brand sweep and its use case and channels come forward.
 */
export function IndustryList() {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 80%" } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="industries" className="relative bg-[#050508] py-24 text-white md:py-32">
      <div className="kx-container">
        <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--ciq-blue)]">Industry solutions</p>
        <TextReveal
          text="Built for every customer conversation."
          accent={["every"]}
          className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02] tracking-[-0.02em]"
        />

        <ul ref={list} className="mt-14 border-t border-white/10">
          {industries.map((item, i) => {
            const channels = item.channels
              .split(/\s*\+\s*/)
              .map(channelKeyFor)
              .filter((c): c is NonNullable<typeof c> => c !== null);
            return (
              <li key={item.href} className="group relative border-b border-white/10">
                <span className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[linear-gradient(90deg,rgba(255,45,139,0.16),rgba(155,77,255,0.12),rgba(45,168,255,0.08))] transition-transform duration-500 ease-out group-hover:scale-y-100" aria-hidden />
                <Link href={item.href} className="relative grid items-center gap-4 py-7 md:grid-cols-[64px_1fr_1fr_auto] md:gap-8">
                  <span className="text-[12px] font-semibold tabular-nums tracking-[0.2em] text-white/40">0{i + 1}</span>
                  <h3 className="text-[clamp(1.6rem,3.2vw,2.8rem)] font-extrabold tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-3">
                    {item.name}
                  </h3>
                  <div className="text-[14px] leading-6 text-white/60 md:opacity-70 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
                    <p>{item.useCase}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      {channels.map((c) => (
                        <ChannelLogo key={c} channel={c} size="sm" />
                      ))}
                      <span className="ml-1 text-[12px] font-semibold text-white/50">{item.channels}</span>
                    </div>
                  </div>
                  <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-[#050508] md:flex">
                    <IconArrowUpRight size={18} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
