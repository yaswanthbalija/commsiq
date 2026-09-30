import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IconCheck } from "@tabler/icons-react";
import { brand } from "@/lib/brand";
import { allGrowthStageSlugs, getGrowthStage, growthStages } from "@/lib/content/growthStages";
import { ChannelLogo } from "@/components/ui/ChannelLogo";
import { FlowSteps } from "@/components/ui/Flow";
import { AutoReveal } from "@/components/motion/AutoReveal";
import { RollText } from "@/components/motion/RollText";
import { TextReveal } from "@/components/motion/TextReveal";

export function generateStaticParams() {
  return allGrowthStageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stage = getGrowthStage(slug);
  if (!stage) return {};
  return { title: `${stage.name} · Growth Stack`, description: stage.summary };
}

export default async function GrowthStagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stage = getGrowthStage(slug);
  if (!stage) notFound();

  const index = growthStages.findIndex((s) => s.slug === stage.slug);
  const prev = growthStages[index - 1];
  const next = growthStages[index + 1];
  const byMediacorn = stage.owner.includes("Mediacorn");

  return (
    <AutoReveal>
      <section className="ciq-page-hero">
        <div className="kx-container py-16 lg:py-20">
          <div className="mb-8">
            <FlowSteps steps={growthStages.map((s) => s.stage)} activeIndex={index} tone="dark" size="sm" />
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ciq-pink)]">
                Growth Stack · {stage.step} {stage.stage}
              </p>
              <TextReveal
                as="h1"
                text={stage.headline}
                trigger="splash"
                stagger={0.06}
                className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl"
              />
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{stage.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/#contact" className="btn-pink">
                  <RollText>Talk to our growth team</RollText>
                </Link>
                <Link href="/growth-stack" className="btn-outline-light">
                  <RollText>Full Growth Stack</RollText>
                </Link>
              </div>
            </div>
            <aside className="self-start rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">The question this stage answers</p>
              <p className="mt-2 text-2xl font-bold text-white">{stage.question}</p>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="text-white/45">Delivered by</dt>
                  <dd className="mt-1 flex items-center gap-3 font-semibold text-white">
                    {byMediacorn ? (
                      <a href={brand.mediacornUrl} rel="noopener noreferrer" className="inline-flex rounded-md bg-[#0b0b12] px-2 py-1">
                        <Image src="/brand/partners/mediacorn-logo.svg" alt="Mediacorn Digital" width={130} height={17} unoptimized />
                      </a>
                    ) : null}
                    {stage.owner.includes("commsIQ") ? (
                      <Image src={brand.logoPath} alt={brand.name} width={110} height={28} unoptimized className="h-7 w-auto" />
                    ) : null}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/45">Channels in this stage</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {stage.channels.map((c) => (
                      <ChannelLogo key={c.label} channel={c.key} size="sm" className="rounded-full bg-white/5 py-1 pl-1 pr-3 text-white/85">
                        {c.label}
                      </ChannelLogo>
                    ))}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="ciq-page-body">
        <div className="kx-container grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <h2 className="text-3xl font-bold text-[var(--ciq-ink)]">What {stage.name.toLowerCase()} means in practice</h2>
          <p className="text-lg leading-8 text-[var(--ciq-ink)]/75">{stage.body}</p>
        </div>
      </section>

      <section className="ciq-section-soft">
        <div className="kx-container py-16">
          <h2 className="text-3xl font-bold text-[var(--ciq-ink)]">What it includes</h2>
          <div className="mt-8 divide-y divide-[var(--ciq-ink)]/8 rounded-2xl border border-[var(--ciq-ink)]/8 bg-white">
            {stage.channels.map((c) => (
              <div key={c.label} className="grid gap-3 px-6 py-5 sm:grid-cols-[220px_1fr] sm:items-start">
                <div className="flex items-center gap-3">
                  <ChannelLogo channel={c.key} size="md" />
                  <h3 className="text-base font-bold text-[var(--ciq-ink)]">{c.label}</h3>
                </div>
                <p className="text-[15px] leading-7 text-[var(--ciq-ink)]/70">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="kx-container py-16">
          <h2 className="text-3xl font-bold text-[var(--ciq-ink)]">How it works</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stage.howItWorks.map((step, i) => (
              <li key={step.title} className="border-t-2 border-[var(--ciq-pink)] pt-4">
                <p className="text-xs font-bold tabular-nums text-[var(--ciq-pink)]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-lg font-bold text-[var(--ciq-ink)]">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-[var(--ciq-ink)]/70">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-[var(--ciq-mist)] p-6">
              <h3 className="text-base font-bold text-[var(--ciq-ink)]">What we need from you</h3>
              <ul className="mt-4 space-y-2.5">
                {stage.inputs.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[15px] text-[var(--ciq-ink)]/80">
                    <IconCheck size={18} stroke={2.5} className="mt-0.5 shrink-0 text-[var(--ciq-blue)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[var(--ciq-mist)] p-6">
              <h3 className="text-base font-bold text-[var(--ciq-ink)]">What you get back</h3>
              <ul className="mt-4 space-y-2.5">
                {stage.outputs.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[15px] text-[var(--ciq-ink)]/80">
                    <IconCheck size={18} stroke={2.5} className="mt-0.5 shrink-0 text-[var(--ciq-pink)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="ciq-section-brand">
        <div className="kx-container relative grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ciq-pink)]">Worked example</p>
            <h2 className="mt-3 text-3xl font-bold text-white">{stage.example.title}</h2>
          </div>
          <ol className="space-y-3">
            {stage.example.steps.map((step, i) => (
              <li key={step} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-4">
                <span className="text-sm font-bold tabular-nums text-[var(--ciq-blue)]">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[15px] leading-7 text-white/85">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white">
        <div className="kx-container grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-2xl font-bold text-[var(--ciq-ink)]">Frequently asked questions</h2>
          <div className="divide-y divide-[var(--ciq-ink)]/8">
            {stage.faqs.map((faq) => (
              <details key={faq.q} className="py-4">
                <summary className="cursor-pointer list-none text-base font-semibold text-[var(--ciq-ink)]">{faq.q}</summary>
                <p className="mt-3 text-[15px] leading-7 text-[var(--ciq-ink)]/70">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <nav className="ciq-section-soft border-t border-[var(--ciq-ink)]/8" aria-label="Growth Stack stages">
        <div className="kx-container grid gap-4 py-8 sm:grid-cols-2">
          {prev ? (
            <Link href={`/growth-stack/${prev.slug}`} className="rounded-2xl border border-[var(--ciq-ink)]/8 bg-white p-5 transition hover:border-[var(--ciq-pink)]/40">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ciq-ink)]/45">Previous · {prev.step} {prev.stage}</p>
              <p className="mt-1 text-lg font-bold text-[var(--ciq-ink)]">{prev.name}</p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/growth-stack/${next.slug}`} className="rounded-2xl border border-[var(--ciq-ink)]/8 bg-white p-5 text-right transition hover:border-[var(--ciq-pink)]/40">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ciq-ink)]/45">Next · {next.step} {next.stage}</p>
              <p className="mt-1 text-lg font-bold text-[var(--ciq-ink)]">{next.name}</p>
            </Link>
          ) : (
            <Link href="/growth-stack" className="rounded-2xl border border-[var(--ciq-ink)]/8 bg-white p-5 text-right transition hover:border-[var(--ciq-pink)]/40">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ciq-ink)]/45">Back to</p>
              <p className="mt-1 text-lg font-bold text-[var(--ciq-ink)]">Growth Stack overview</p>
            </Link>
          )}
        </div>
      </nav>
    </AutoReveal>
  );
}
