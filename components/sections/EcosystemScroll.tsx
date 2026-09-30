"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tabGroups } from "@/lib/content/home";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  { id: "useCases", title: "Every use case", items: tabGroups.useCases },
  { id: "industries", title: "Any industry", items: tabGroups.industries },
  { id: "channels", title: "Omnichannel suite", items: tabGroups.channels },
] as const;

export function EcosystemScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      panelsRef.current.forEach((panel) => {
        if (!panel) return;
        gsap.fromTo(
          panel,
          { opacity: 0, y: 48, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[var(--ciq-mist)]">
      <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-[var(--ciq-pink)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-[var(--ciq-blue)]/10 blur-3xl" />
      <div className="kx-container py-20 md:py-24">
        <div className="text-center">
          <h2 className="mb-4 text-[32px] leading-[1.2] font-bold text-[var(--ciq-ink)]">
            The only CPaaS partner you need
          </h2>
          <p className="text-[16px] leading-6 text-[var(--ciq-ink)]/70">
            AI-powered engagement to deliver consistent business results
          </p>
        </div>

        <div className="relative mt-14 space-y-5 md:mt-16">
          {panels.map((panel, i) => (
            <div
              key={panel.id}
              ref={(el) => {
                panelsRef.current[i] = el;
              }}
              className="rounded-[22px] border border-[var(--ciq-purple)]/15 bg-white px-6 py-6 shadow-[0_10px_40px_rgba(155,77,255,0.06)] md:px-8"
            >
              <h3 className="mb-4 text-[20px] font-bold text-[var(--ciq-ink)]">{panel.title}</h3>
              <div className="flex flex-wrap gap-2">
                {panel.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[20px] border border-transparent bg-[linear-gradient(90deg,rgba(255,45,139,0.08),rgba(45,168,255,0.08))] px-4 py-2 text-[15px] text-[var(--ciq-ink)] transition hover:border-[var(--ciq-pink)]/30 hover:text-[var(--ciq-pink)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
