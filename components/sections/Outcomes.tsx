"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { outcomes, partnerships } from "@/lib/content/home";

gsap.registerPlugin(ScrollTrigger);

export function Outcomes() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-out]"), {
        opacity: 0,
        y: 32,
        duration: 0.6,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 72%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--ciq-black)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-[var(--ciq-pink)]/25 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[420px] w-[420px] rounded-full bg-[var(--ciq-blue)]/22 blur-[120px]" />
      </div>
      <div className="kx-container relative py-20 md:py-24">
        <div data-out className="max-w-3xl">
          <h2 className="text-[32px] leading-[1.2] font-bold text-white">
            At enterprise scale, communication isn’t just about reach - it’s about business outcomes.
          </h2>
          <p className="mt-4 text-[16px] leading-6 text-white/75">
            commsIQ gives you exclusive advantages that drive measurable growth, efficiency, trust,
            and innovation.
          </p>
        </div>

        <div data-out className="mt-10">
          <h3 className="text-[18px] font-bold text-white">Partnerships and recognitions</h3>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
            {partnerships.map((p) => (
              <div
                key={p}
                className="min-w-[210px] shrink-0 rounded-[18px] border border-white/15 bg-white/5 px-5 py-6 text-center text-[14px] font-semibold text-white"
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {outcomes.map((item) => (
            <article
              key={item.title}
              data-out
              className="flex h-full flex-col rounded-[22px] border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-[20px] font-bold text-white">{item.title}</h3>
              <p className="mt-3 flex-1 text-[14px] leading-6 text-white/75">{item.body}</p>
              <p className="mt-6 text-[36px] font-bold ciq-gradient-text">{item.metric}</p>
              <p className="text-[14px] text-white/65">{item.metricLabel}</p>
              <p className="mt-2 text-[12px] uppercase tracking-wider text-white/45">{item.proof}</p>
              <Link href={item.href} className="mt-4 text-[14px] font-semibold text-[var(--ciq-blue)] hover:underline">
                Read Case Study &gt;
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
