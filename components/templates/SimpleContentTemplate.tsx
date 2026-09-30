import Link from "next/link";
import { Reveal3D } from "@/components/motion/Reveal3D";
import { RollText } from "@/components/motion/RollText";
import { TextReveal } from "@/components/motion/TextReveal";

type Props = {
  title: string;
  eyebrow?: string;
  summary: string;
  sections: { heading: string; body: string }[];
};

export function SimpleContentTemplate({ title, eyebrow, summary, sections }: Props) {
  return (
    <div>
      <section className="ciq-page-hero">
        <div className="kx-container py-16 lg:py-20">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ciq-pink)]">
              {eyebrow}
            </p>
          ) : null}
          <TextReveal
            as="h1"
            text={title}
            trigger="splash"
            stagger={0.06}
            className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl"
          />
          <Reveal3D tilt={0}>
            <p className="mt-5 max-w-2xl text-lg text-white/75">{summary}</p>
          </Reveal3D>
        </div>
      </section>
      <section className="ciq-page-body">
        <Reveal3D tilt={6} stagger={0.1} className="kx-container max-w-3xl space-y-10 py-16">
          {sections.map((section) => (
            <article key={section.heading}>
              <TextReveal text={section.heading} className="text-2xl font-bold text-[var(--ciq-ink)]" />
              <p className="mt-3 text-base leading-8 text-[var(--ciq-ink)]/75">{section.body}</p>
            </article>
          ))}
          <Link href="/#contact" className="btn-pink inline-flex">
            <RollText>Talk to CPaaS expert</RollText>
          </Link>
        </Reveal3D>
      </section>
    </div>
  );
}
