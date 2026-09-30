import Link from "next/link";
import { caseStudies } from "@/lib/content/caseStudies";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata = {
  title: "Case Studies",
  description: "Measurable engagement outcomes across industries and channels.",
};

export default function CaseStudiesIndexPage() {
  return (
    <section className="ciq-page-hero min-h-[70vh]">
      <div className="kx-container py-20">
        <FadeIn>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Case Studies</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Real enterprise outcomes: anonymized patterns inspired by high-impact engagement programs.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {caseStudies.map((study, i) => (
            <FadeIn key={study.slug} delay={i * 0.05}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="block h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-[var(--ciq-pink)]/40 hover:bg-white/10"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--ciq-blue)]">
                  {study.channel} · {study.industry}
                </p>
                <h2 className="mt-3 text-xl font-bold text-white">{study.title}</h2>
                <p className="mt-3 text-sm text-white/65">{study.excerpt}</p>
                <p className="mt-5 text-2xl font-bold text-white">
                  <span className="ciq-gradient-text">{study.metric}</span>{" "}
                  <span className="text-sm font-normal text-white/45">{study.metricLabel}</span>
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
