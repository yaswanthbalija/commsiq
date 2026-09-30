import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";
import type { PlatformPage } from "@/lib/content/platform";
import { brand } from "@/lib/brand";
import { OrbitDiagram } from "@/components/ui/OrbitDiagram";
import { FlowText, splitFlow } from "@/components/ui/Flow";
import {
  AnalyticsVisual,
  ApiVisual,
  HandoffMark,
  OrchestrationVisual,
} from "@/components/ui/PlatformVisuals";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal3D } from "@/components/motion/Reveal3D";
import { RollText } from "@/components/motion/RollText";
import { TextReveal } from "@/components/motion/TextReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

function HeroVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "omnichannel":
      return <OrbitDiagram focus="connect" />;
    case "journey-orchestration":
      return <OrchestrationVisual />;
    case "apis-integrations":
      return <ApiVisual />;
    case "analytics-insights":
      return <AnalyticsVisual />;
    default:
      return null;
  }
}

type Section = PlatformPage["sections"][number];

function isHandoff(section: Section) {
  return splitFlow(section.title).length === 2;
}

/** "SMS → WhatsApp" style hand-off cards, grouped into one row. */
function HandoffGrid({ sections }: { sections: Section[] }) {
  return (
    <Reveal3D className="grid gap-4 sm:grid-cols-2">
      {sections.map((section) => {
        const [from, to] = splitFlow(section.title);
        return (
          <TiltCard key={section.title} max={5} className="rounded-2xl">
            <article className="h-full rounded-2xl border border-[var(--ciq-ink)]/8 bg-white p-6">
              <HandoffMark from={from} to={to} />
              <h3 className="mt-4 text-lg font-bold text-[var(--ciq-ink)]">
                {from} to {to}
              </h3>
              <p className="mt-2 text-[15px] leading-7 text-[var(--ciq-ink)]/70">{section.body}</p>
            </article>
          </TiltCard>
        );
      })}
    </Reveal3D>
  );
}

function ContentRow({ section, index }: { section: Section; index: number }) {
  return (
    <Reveal3D
      selector="[data-row-part]"
      stagger={0.12}
      tilt={6}
      className={cn(
        "grid gap-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16",
        index > 0 && "border-t border-[var(--ciq-ink)]/8",
      )}
    >
      <div data-row-part>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ciq-pink)]">
          {String(index + 1).padStart(2, "0")}
        </p>
        <TextReveal as="h3" text={section.title} className="mt-2 text-2xl font-bold tracking-tight text-[var(--ciq-ink)]" />
      </div>
      <div data-row-part>
        <FlowText text={section.body} className="text-base leading-7 text-[var(--ciq-ink)]/70" />
        {section.items?.length ? (
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {section.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[15px] text-[var(--ciq-ink)]/85">
                <IconCheck size={18} stroke={2.5} className="mt-0.5 shrink-0 text-[var(--ciq-pink)]" />
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Reveal3D>
  );
}

export function PlatformTemplate({ page }: { page: PlatformPage }) {
  const handoffs = page.sections.filter(isHandoff);
  const rows = page.sections.filter((s) => !isHandoff(s));

  return (
    <div>
      <section className="ciq-page-hero">
        <div className="kx-container grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ciq-pink)]">
              {page.eyebrow} · {page.name}
            </p>
            <TextReveal
              as="h1"
              text={page.headline}
              trigger="splash"
              stagger={0.06}
              className="mt-3 max-w-xl text-4xl font-bold tracking-tight text-white md:text-5xl"
            />
            <Reveal3D tilt={0} stagger={0.1}>
              <p className="mt-5 max-w-xl text-lg text-white/75">{page.summary}</p>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/60">{page.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/#contact" className="btn-pink">
                  <RollText>Talk to CPaaS expert</RollText>
                </Link>
                <Link href="/developers" className="btn-outline-light">
                  <RollText>Explore APIs</RollText>
                </Link>
              </div>
            </Reveal3D>
          </div>
          <Parallax
            distance={-50}
            scaleFrom={0.94}
            className="flex min-h-[360px] items-center justify-center lg:-mb-12 lg:justify-end"
          >
            <HeroVisual slug={page.slug} />
          </Parallax>
        </div>
      </section>

      <section className="ciq-page-body">
        <div className="kx-container py-8 lg:py-14">
          {rows.map((section, index) => (
            <ContentRow key={section.title} section={section} index={index} />
          ))}
        </div>
      </section>

      {handoffs.length ? (
        <section className="ciq-section-soft">
          <div className="kx-container py-16">
            <TextReveal
              text="Channel hand-offs that keep context"
              accent={["context"]}
              className="text-3xl font-bold text-[var(--ciq-ink)]"
            />
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--ciq-ink)]/65">
              Each pair below is a live pattern on {brand.name}: the customer keeps one identity and one history
              while the channel changes.
            </p>
            <div className="mt-8">
              <HandoffGrid sections={handoffs} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="ciq-section-brand">
        <div className="kx-container relative flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <div>
            <TextReveal
              text={`Build ${page.name.toLowerCase()} on ${brand.name}`}
              accent={[brand.name]}
              className="text-2xl font-bold text-white"
            />
            <p className="mt-2 max-w-xl text-base text-white/70">
              Connect channels, journeys and APIs in one communication stack.
            </p>
          </div>
          <Link href="/#contact" className="btn-pink">
            <RollText>Talk to CPaaS expert</RollText>
          </Link>
        </div>
      </section>
    </div>
  );
}
