import Link from "next/link";
import type { SolutionPage } from "@/lib/content/solutions";
import { ChannelLogo, channelKeyFor, type ChannelKey } from "@/components/ui/ChannelLogo";
import { ChannelPoster, posterChannel } from "@/components/ui/ChannelPoster";
import { ScenarioPeek } from "@/components/ui/ScenarioScreen";
import { getScenario } from "@/lib/content/scenarios";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal3D } from "@/components/motion/Reveal3D";
import { RollText } from "@/components/motion/RollText";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";

const CHANNEL_ORDER: ChannelKey[] = ["sms", "whatsapp", "rcs", "voice", "contact-centre", "audience", "advertising"];

/** Channels this solution actually touches, inferred from its pillar titles. */
function channelsUsed(solution: SolutionPage): ChannelKey[] {
  const found = new Set<ChannelKey>();
  for (const pillar of solution.pillars) {
    const key = channelKeyFor(`${pillar.title} ${pillar.body}`);
    if (key) found.add(key);
  }
  if (found.size === 0) ["sms", "whatsapp", "rcs", "voice"].forEach((k) => found.add(k as ChannelKey));
  return CHANNEL_ORDER.filter((k) => found.has(k));
}

export function SolutionTemplate({ solution }: { solution: SolutionPage }) {
  const channels = channelsUsed(solution);
  const scenario = getScenario(solution.slug);

  return (
    <div>
      <section className="ciq-page-hero">
        <div className="kx-container grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ciq-pink)]">
              {solution.eyebrow} · {solution.name}
            </p>
            <TextReveal
              as="h1"
              text={solution.headline}
              trigger="splash"
              stagger={0.06}
              className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl"
            />
            <Reveal3D tilt={0} stagger={0.1}>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{solution.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Channels</span>
                {channels.map((c) => (
                  <ChannelLogo key={c} channel={c} size="sm" withLabel className="rounded-full bg-white/5 py-1 pl-1 pr-3 text-white/85" />
                ))}
              </div>
              <div className="mt-8">
                <Link href="/#contact" className="btn-pink">
                  <RollText>Talk to CPaaS expert</RollText>
                </Link>
              </div>
            </Reveal3D>
          </div>
          <Parallax distance={-50} scaleFrom={0.94} className="flex justify-center lg:-mb-16 lg:justify-end">
            <ChannelPoster channel={posterChannel(channels[0] ?? "omnichannel")} title={solution.name} className="max-w-[420px]" />
          </Parallax>
        </div>
      </section>

      <section className="ciq-page-body">
        <div className="kx-container py-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <TextReveal
                text={`What ${solution.name} includes`}
                className="text-3xl font-bold text-[var(--ciq-ink)]"
              />
              <p className="mt-3 text-base leading-7 text-[var(--ciq-ink)]/65">
                {solution.pillars.length} capabilities, each mapped to the channel that carries it best.
              </p>
              {scenario ? (
                <div className="mt-8 hidden lg:block">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ciq-ink)]/45">
                    Example conversation
                  </p>
                  <ScenarioPeek scenario={scenario} limit={3} />
                </div>
              ) : null}
            </div>
            <Reveal3D tilt={10} stagger={0.1} selector="li" className="[&>ol]:divide-y [&>ol]:divide-[var(--ciq-ink)]/8">
            <ol>
              {solution.pillars.map((pillar, index) => {
                const channel =
                  channelKeyFor(`${pillar.title} ${pillar.body}`) ?? channels[index % channels.length] ?? "omnichannel";
                return (
                  <li key={pillar.title} className={cn("flex gap-5 py-6", index === 0 && "pt-0")}>
                    <ChannelLogo channel={channel} size="lg" className="shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-[var(--ciq-ink)]">{pillar.title}</h3>
                      <p className="mt-2 text-[15px] leading-7 text-[var(--ciq-ink)]/70">{pillar.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            </Reveal3D>
          </div>
        </div>
      </section>

      <section className="ciq-section-brand">
        <div className="kx-container relative flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <div>
            <TextReveal
              text={`Set up ${solution.name} with commsIQ`}
              accent={["commsIQ"]}
              className="text-2xl font-bold text-white"
            />
            <p className="mt-2 max-w-xl text-base text-white/70">
              Our team maps your use case to the right channel mix, templates and integrations.
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
