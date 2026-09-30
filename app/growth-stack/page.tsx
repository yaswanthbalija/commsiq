import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { AutoReveal } from "@/components/motion/AutoReveal";
import { Parallax } from "@/components/motion/Parallax";
import { RollText } from "@/components/motion/RollText";
import { TextReveal } from "@/components/motion/TextReveal";
import { ChannelPoster } from "@/components/ui/ChannelPoster";
import { ChannelLogo } from "@/components/ui/ChannelLogo";
import { FlowSteps, splitFlow } from "@/components/ui/Flow";
import { brand } from "@/lib/brand";
import { growthStack } from "@/lib/content/growthStack";

export const metadata = {
  title: "Growth Stack",
  description:
    "From communication to customer growth. Audience Intelligence, Programmatic Advertising, Messaging and Voice in one full-funnel ecosystem.",
};

export default function GrowthStackPage() {
  return (
    <AutoReveal>
      <section className="ciq-page-hero">
        <div className="kx-container grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ciq-pink)]">
              {growthStack.eyebrow}
            </p>
            <TextReveal
              as="h1"
              text={growthStack.headline}
              trigger="splash"
              accent={["Growth."]}
              stagger={0.06}
              className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl"
            />
            <FadeIn delay={0.4}>
            <p className="mt-5 max-w-2xl text-lg text-white/75">{growthStack.subhead}</p>
            <div className="mt-5 max-w-2xl space-y-3">
              {growthStack.intro.map((para) => (
                <p key={para.slice(0, 40)} className="text-[15px] leading-7 text-white/65">
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-6">
              <FlowSteps
                steps={splitFlow(growthStack.flow).map((s) => s.charAt(0) + s.slice(1).toLowerCase())}
                tone="dark"
                size="sm"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/75">
              <span>Audience and advertising delivered with</span>
              <a
                href={brand.mediacornUrl}
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-white/10 bg-[#0b0b12] px-3 py-1.5 transition hover:border-white/30"
                aria-label="Mediacorn Digital website"
              >
                <Image
                  src="/brand/partners/mediacorn-logo.svg"
                  alt="Mediacorn Digital"
                  width={150}
                  height={20}
                  unoptimized
                />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#contact" className="btn-pink">
                <RollText>{growthStack.cta.primary}</RollText>
              </Link>
              <Link href="/#contact" className="btn-outline-light">
                <RollText>{growthStack.cta.secondary}</RollText>
              </Link>
            </div>
            </FadeIn>
          </div>
          <Parallax distance={-50} scaleFrom={0.94} className="flex justify-center lg:justify-end">
            <ChannelPoster channel="growth" className="max-w-[440px]" />
          </Parallax>
        </div>
      </section>

      <section className="ciq-page-body">
        <div className="kx-container py-16">
          <FadeIn>
            <h2 className="text-3xl font-bold text-[var(--ciq-ink)]">{growthStack.tagline}</h2>
          </FadeIn>
          <div className="mt-10 divide-y divide-[var(--ciq-ink)]/8 border-y border-[var(--ciq-ink)]/8">
            {growthStack.stages.map((stage, i) => (
              <FadeIn key={stage.id} delay={i * 0.04}>
                <Link
                  href={`/growth-stack/${stage.id}`}
                  id={stage.id}
                  className="group grid scroll-mt-28 gap-4 py-8 transition md:grid-cols-[120px_1fr_auto] md:items-start md:gap-8"
                >
                  <p className="text-xs font-semibold tracking-[0.18em] text-[var(--ciq-pink)] uppercase">
                    {stage.step}
                    <span className="mt-1 block text-2xl font-bold tracking-normal text-[var(--ciq-ink)]">
                      {stage.title.charAt(0) + stage.title.slice(1).toLowerCase()}
                    </span>
                  </p>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--ciq-ink)] group-hover:text-[var(--ciq-pink)]">
                      {stage.name}
                    </h3>
                    <p className="mt-1 text-base font-medium text-[var(--ciq-ink)]/80">{stage.question}</p>
                    <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[var(--ciq-ink)]/65">{stage.body}</p>
                    {"channels" in stage && stage.channels ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {stage.channels.map((channel) => (
                          <ChannelLogo
                            key={channel}
                            channel={channel}
                            size="sm"
                            className="rounded-full bg-[var(--ciq-mist)] py-1 pl-1 pr-3 text-[var(--ciq-ink)]/80"
                          >
                            {channel}
                          </ChannelLogo>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <span className="text-sm font-semibold text-[var(--ciq-blue)] md:pt-1">Read more</span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="ciq-section-soft py-14 md:py-16">
        <div className="kx-container">
          <h2 className="text-3xl font-bold text-[var(--ciq-ink)]">
            {growthStack.comparison.headline}
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              growthStack.comparison.traditionalAdvertising,
              growthStack.comparison.traditionalCpaas,
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[20px] border border-[var(--ciq-ink)]/8 bg-white p-6"
              >
                <h3 className="text-lg font-bold text-[var(--ciq-ink)]">{item.title}</h3>
                <div className="mt-3">
                  <FlowSteps steps={splitFlow(item.flow)} size="sm" />
                </div>
                <p className="mt-3 text-sm text-[var(--ciq-ink)]/65">{item.body}</p>
              </article>
            ))}
            <article className="rounded-[20px] border border-[var(--ciq-pink)]/30 bg-[#07112b] p-6 text-white">
              <h3 className="text-lg font-bold">
                {growthStack.comparison.growthStack.title}
              </h3>
              <div className="mt-3">
                <FlowSteps steps={growthStack.comparison.growthStack.flow} tone="dark" size="sm" />
              </div>
              <p className="mt-3 text-sm text-white/70">
                {growthStack.comparison.growthStack.body}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-16">
        <div className="kx-container">
          <h2 className="text-3xl font-bold text-[var(--ciq-ink)]">The Growth Stack Architecture</h2>
          <ol className="mt-8 space-y-3">
            {growthStack.architecture.map((item, i) => (
              <li
                key={item}
                className="rounded-[16px] border border-[var(--ciq-ink)]/8 bg-[var(--ciq-mist)] px-5 py-4 text-sm text-[var(--ciq-ink)]/75"
              >
                <span className="mr-2 font-bold text-[var(--ciq-pink)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ciq-section-brand py-14 md:py-16">
        <div className="kx-container relative">
          <h2 className="max-w-3xl text-3xl font-bold text-white">
            {growthStack.mediaExpertise.headline}
          </h2>
          <p className="mt-3 text-base font-medium text-white/85">
            {growthStack.mediaExpertise.subhead}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65">
            {growthStack.mediaExpertise.body}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {growthStack.mediaExpertise.channels.map((channel) => (
              <article
                key={channel.title}
                className="flex gap-4 rounded-[18px] border border-white/10 bg-white/[0.06] p-5"
              >
                <ChannelLogo channel="advertising" size="md" className="shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white">{channel.title}</h3>
                  <p className="mt-2 text-sm text-white/65">{channel.body}</p>
                </div>
              </article>
            ))}
          </div>
          <a
            href={brand.mediacornUrl}
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-[#0b0b12] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40"
          >
            <Image src="/brand/partners/mediacorn-logo.svg" alt="" width={120} height={16} unoptimized aria-hidden />
            Visit mediacorndigital.com
          </a>
        </div>
      </section>

      <section className="ciq-section-soft py-14 md:py-16">
        <div className="kx-container">
          <h2 className="text-3xl font-bold text-[var(--ciq-ink)]">The Intelligence Loop</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--ciq-ink)]/65">
            {growthStack.intelligenceLoopBody}
          </p>
          <div className="mt-8">
            <FlowSteps steps={growthStack.intelligenceLoop} />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-16">
        <div className="kx-container">
          <h2 className="text-3xl font-bold text-[var(--ciq-ink)]">
            {growthStack.growthFocused.headline}
          </h2>
          <p className="mt-3 text-base font-medium text-[var(--ciq-ink)]/80">
            {growthStack.growthFocused.subhead}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--ciq-ink)]/65">
            {growthStack.growthFocused.body}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {growthStack.growthFocused.stages.map((stage) => (
              <article
                key={stage.title}
                className="rounded-[18px] border border-[var(--ciq-ink)]/8 bg-[var(--ciq-mist)] p-5"
              >
                <h3 className="font-bold text-[var(--ciq-ink)]">{stage.title}</h3>
                <p className="mt-2 text-sm text-[var(--ciq-ink)]/65">{stage.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ciq-section-soft py-14 md:py-16">
        <div className="kx-container">
          <h2 className="text-3xl font-bold text-[var(--ciq-ink)]">{growthStack.startups.headline}</h2>
          <p className="mt-3 text-base font-medium text-[var(--ciq-ink)]/80">
            {growthStack.startups.subhead}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--ciq-ink)]/65">
            {growthStack.startups.body}
          </p>
          <p className="mt-6 text-sm font-semibold text-[var(--ciq-pink)]">
            {growthStack.startups.closing}
          </p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-16">
        <div className="kx-container">
          <h2 className="text-3xl font-bold text-[var(--ciq-ink)]">Example Journeys</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {growthStack.examples.map((example) => (
              <article
                key={example.title}
                className="rounded-[22px] border border-[var(--ciq-ink)]/8 bg-[var(--ciq-mist)] p-6"
              >
                <h3 className="text-xl font-bold text-[var(--ciq-ink)]">{example.title}</h3>
                <ol className="mt-4 space-y-3">
                  {example.steps.map((step) => {
                    const colon = step.indexOf(":");
                    const channel = colon > -1 ? step.slice(0, colon) : "";
                    const text = colon > -1 ? step.slice(colon + 1).trim() : step;
                    return (
                      <li key={step} className="flex items-start gap-3 text-sm leading-6 text-[var(--ciq-ink)]/70">
                        <ChannelLogo channel={channel || text} size="sm" className="mt-0.5 shrink-0" />
                        <span>
                          {channel ? (
                            <span className="font-semibold text-[var(--ciq-ink)]">{channel}. </span>
                          ) : null}
                          {text}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ciq-section-soft py-14 md:py-16">
        <div className="kx-container">
          <h2 className="text-3xl font-bold text-[var(--ciq-ink)]">Why the commsIQ Growth Stack?</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {growthStack.why.map((item) => (
              <article
                key={item.title}
                className="rounded-[20px] border border-[var(--ciq-ink)]/8 bg-white p-6"
              >
                <h3 className="text-lg font-bold text-[var(--ciq-ink)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--ciq-ink)]/65">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ciq-section-brand py-14 md:py-16">
        <div className="kx-container relative">
          <h2 className="max-w-3xl text-3xl font-bold text-white">{growthStack.cta.headline}</h2>
          <p className="mt-3 text-lg text-white/85">{growthStack.cta.subhead}</p>
          <ul className="mt-6 space-y-2">
            {growthStack.cta.points.map((point) => (
              <li key={point} className="text-sm text-white/70">
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-semibold text-white/85">{growthStack.cta.line}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#contact" className="btn-pink">
              <RollText>{growthStack.cta.primary}</RollText>
            </Link>
            <Link href="/#contact" className="btn-outline-light">
              <RollText>{growthStack.cta.secondary}</RollText>
            </Link>
          </div>
        </div>
      </section>
    </AutoReveal>
  );
}
