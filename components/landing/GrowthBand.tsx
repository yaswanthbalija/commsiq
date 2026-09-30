import Link from "next/link";
import { IconArrowUpRight, IconDeviceTv, IconMessages, IconPhoneCall, IconUsers } from "@tabler/icons-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { RollText } from "@/components/motion/RollText";
import { TextReveal } from "@/components/motion/TextReveal";
import { brand } from "@/lib/brand";
import { growthTeaser } from "@/lib/content/home";
import { FunnelFlow } from "./FunnelFlow";

const PILLARS = [
  { label: "Audience Intelligence", Icon: IconUsers, c: "#2da8ff", note: "First-party cohorts & intent" },
  { label: "Programmatic Advertising", Icon: IconDeviceTv, c: "#9b4dff", note: "Display · Video · CTV" },
  { label: "Messaging", Icon: IconMessages, c: "#25d366", note: "SMS · WhatsApp · RCS" },
  { label: "Voice", Icon: IconPhoneCall, c: "#ff2d8b", note: "Outbound · IVR · Agents" },
];

const STAGES = ["Impression", "Interaction", "Conversion"];

/** Growth Stack band: statement, the four pillars feeding a live full-funnel flow, CTAs and the Mediacorn link. */
export function GrowthBand() {
  return (
    <section id="growth" className="relative overflow-hidden bg-[#050508] py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="ciq-glow ciq-glow--pink -left-[10%] top-0 h-[60vh] w-[60vh]" />
        <div className="ciq-glow ciq-glow--blue -right-[10%] bottom-0 h-[60vh] w-[60vh]" />
      </div>

      <div className="kx-container relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--ciq-purple)]">{growthTeaser.eyebrow}</p>
            <TextReveal
              text={growthTeaser.headline}
              accent={["Growth", "Stack."]}
              className="mt-4 text-[clamp(2.2rem,4.6vw,4rem)] font-extrabold leading-[1.0] tracking-[-0.03em]"
            />
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/65 md:text-base">{growthTeaser.body}</p>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {PILLARS.map((p) => (
                <li key={p.label} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-white/25">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${p.c}, #0b0b14)` }}>
                    <p.Icon size={20} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold">{p.label}</span>
                    <span className="block text-[12px] text-white/50">{p.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* live funnel */}
          <div className="relative rounded-[28px] border border-white/10 bg-[#0b0b14]/70 p-5 backdrop-blur-md md:p-7">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              <span>Full-funnel · live</span>
              <span className="flex items-center gap-1.5">
                <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#25d366]" /> streaming
              </span>
            </div>
            <div className="relative mt-4 h-[300px] md:h-[360px]">
              <FunnelFlow />
              <ul className="pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-3 text-center">
                {STAGES.map((s, i) => (
                  <li key={s} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70" style={{ paddingLeft: `${i * 6}%` }}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 text-[clamp(1.1rem,1.8vw,1.5rem)] font-bold tracking-tight">
              <span className="ciq-gradient-text">{growthTeaser.line}</span>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-3">
          <Magnetic>
            <Link href={growthTeaser.cta.href} className="btn-pink">
              <RollText>{growthTeaser.cta.label}</RollText>
            </Link>
          </Magnetic>
          <a href={brand.mediacornUrl} target="_blank" rel="noreferrer" className="btn-outline-light inline-flex items-center gap-2">
            {brand.legalName} <IconArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
