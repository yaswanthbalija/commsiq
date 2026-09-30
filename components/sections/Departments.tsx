"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { departments } from "@/lib/content/home";

gsap.registerPlugin(ScrollTrigger);

export function Departments() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-dept]"), {
        opacity: 0,
        y: 28,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 78%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[var(--ciq-mist)]">
      <div className="kx-container py-20 md:py-24">
        <div data-dept className="max-w-3xl">
          <h2 className="text-[32px] leading-[1.2] font-bold text-[var(--ciq-ink)]">
            The right message, delivered by the right team
          </h2>
          <p className="mt-4 text-[16px] leading-6 text-[var(--ciq-ink)]/70">
            Empower every department to own the customer experience and contribute directly to
            revenue goals.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {departments.map((dept) => (
            <article
              key={dept.title}
              data-dept
              className="h-full rounded-[22px] border border-[var(--ciq-purple)]/10 bg-white p-6 shadow-[0_8px_30px_rgba(11,11,18,0.04)] transition hover:-translate-y-1 hover:border-[var(--ciq-blue)]/30"
            >
              <h3 className="text-[20px] font-bold text-[var(--ciq-ink)]">{dept.title}</h3>
              <p className="mt-3 text-[14px] leading-6 text-[var(--ciq-ink)]/70">{dept.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
