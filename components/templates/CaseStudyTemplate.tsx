import Link from "next/link";
import type { CaseStudy } from "@/lib/content/caseStudies";
import { FadeIn } from "@/components/motion/FadeIn";

export function CaseStudyTemplate({ study }: { study: CaseStudy }) {
  return (
    <div>
      <section className="ciq-page-hero">
        <div className="kx-container py-20">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ciq-pink)]">
              {study.channel} · {study.industry}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl">
              {study.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">{study.excerpt}</p>
            <p className="mt-8 text-4xl font-bold text-white">
              <span className="ciq-gradient-text">{study.metric}</span>{" "}
              <span className="text-base font-normal text-white/55">{study.metricLabel}</span>
            </p>
          </FadeIn>
        </div>
      </section>
      <section className="ciq-page-body">
        <div className="kx-container grid gap-4 py-16 md:grid-cols-3">
          {[
            ["Challenge", study.challenge],
            ["Approach", study.approach],
            ["Result", study.result],
          ].map(([title, body], i) => (
            <FadeIn key={title} delay={i * 0.06}>
              <article className="h-full rounded-3xl border border-[var(--ciq-purple)]/15 bg-white p-6 shadow-[0_8px_30px_rgba(11,11,18,0.04)]">
                <h2 className="text-lg font-bold text-[var(--ciq-ink)]">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ciq-ink)]/70">{body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
        <div className="kx-container pb-16">
          <Link href="/case-studies" className="btn-outline-dark">
            All case studies
          </Link>
        </div>
      </section>
    </div>
  );
}
