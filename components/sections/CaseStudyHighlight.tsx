"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudies } from "@/lib/content/caseStudies";

gsap.registerPlugin(ScrollTrigger);

export function CaseStudyHighlight() {
  const ref = useRef<HTMLElement>(null);
  const featured = caseStudies.slice(0, 3);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-cs]"), {
        opacity: 0,
        y: 36,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 78%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white">
      <div className="kx-container py-20 md:py-24">
        <div data-cs className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-[32px] leading-[1.2] font-bold text-[var(--ciq-ink)]">
            Driving measurable impact across customer journeys
          </h2>
          <Link href="/case-studies" className="btn-outline-dark shrink-0">
            Read More Case Studies
          </Link>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featured.map((study) => (
            <Link
              key={study.slug}
              data-cs
              href={`/case-studies/${study.slug}`}
              className="group rounded-[22px] border border-[var(--ciq-purple)]/10 bg-[var(--ciq-mist)] p-7 transition hover:-translate-y-1 hover:border-[var(--ciq-pink)]/30 hover:shadow-[0_16px_40px_rgba(255,45,139,0.1)]"
            >
              <p className="text-xs font-semibold tracking-[0.16em] text-[var(--ciq-blue)] uppercase">
                {study.channel}
              </p>
              <h3 className="mt-3 text-[20px] leading-7 font-bold text-[var(--ciq-ink)]">
                {study.title}
              </h3>
              <p className="mt-4 text-[14px] font-semibold text-[var(--ciq-pink)] group-hover:underline">
                Read case study
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
