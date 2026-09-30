import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { outcomeSolutions } from "@/lib/content/solutions";

export const metadata = {
  title: "Solutions",
  description: "Communication solutions built around business outcomes.",
};

export default function SolutionsIndexPage() {
  return (
    <div>
      <section className="ciq-page-hero">
        <div className="kx-container py-20">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ciq-pink)]">
              Solutions
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
              Communication Solutions Built Around Business Outcomes.
            </h1>
          </FadeIn>
        </div>
      </section>
      <section className="ciq-page-body">
        <div className="kx-container grid gap-5 py-16 md:grid-cols-2">
          {outcomeSolutions.map((solution, i) => (
            <FadeIn key={solution.slug} delay={i * 0.05}>
              <Link
                href={`/solutions/${solution.slug}`}
                className="block h-full rounded-[22px] border border-[var(--ciq-ink)]/8 bg-white p-7 shadow-[0_8px_30px_rgba(11,11,18,0.04)] transition hover:-translate-y-1"
              >
                <h2 className="text-2xl font-bold text-[var(--ciq-ink)]">{solution.name}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--ciq-ink)]/70">
                  {solution.summary}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
