import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";
import { products } from "@/lib/content/home";
import { ChannelLogo } from "@/components/ui/ChannelLogo";
import { FlowSteps, splitFlow } from "@/components/ui/Flow";
import { ChannelPoster, posterChannel } from "@/components/ui/ChannelPoster";
import { Reveal3D } from "@/components/motion/Reveal3D";
import { RollText } from "@/components/motion/RollText";
import { TextReveal } from "@/components/motion/TextReveal";
import { TiltCard } from "@/components/motion/TiltCard";

export const metadata = {
  title: "Products",
  description:
    "Every channel. One communication ecosystem. SMS, WhatsApp, RCS and Voice.",
};

export default function ProductsIndexPage() {
  return (
    <div>
      <section className="ciq-page-hero">
        <div className="kx-container py-16 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ciq-pink)]">
            Products
          </p>
          <TextReveal
            as="h1"
            text="Every Channel. One Communication Ecosystem."
            trigger="splash"
            accent={["One"]}
            stagger={0.07}
            className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl"
          />
          <Reveal3D tilt={0} stagger={0.1}>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Build customer communication across four powerful channels. Use each independently,
              or connect them to create intelligent customer journeys.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {(["sms", "whatsapp", "rcs", "voice"] as const).map((c) => (
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
      </section>

      <section className="ciq-page-body">
        <Reveal3D className="kx-container grid gap-5 py-16 md:grid-cols-2">
          {products.map((product) => {
            return (
              <TiltCard key={product.slug} max={4} className="h-full rounded-[22px]">
              <Link
                href={product.href}
                className="grid h-full overflow-hidden rounded-[22px] border border-[var(--ciq-ink)]/8 bg-white shadow-[0_8px_30px_rgba(11,11,18,0.04)] transition hover:border-[var(--ciq-pink)]/30 sm:grid-cols-[1fr_190px]"
              >
                <div className="p-7">
                  <ChannelLogo channel={product.slug} size="md" withLabel className="text-[var(--ciq-ink)]" />
                  <p className="mt-4 text-xs font-semibold tracking-[0.18em] text-[var(--ciq-pink)] uppercase">
                    {product.subtitle}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-[var(--ciq-ink)]">{product.title}</h2>
                  <p className="mt-3 text-[15px] leading-7 text-[var(--ciq-ink)]/70">{product.description}</p>
                  <ul className="mt-5 space-y-2.5">
                    {product.points.map((point) => {
                      const flow = splitFlow(point);
                      return (
                        <li key={point} className="flex items-start gap-2 text-sm text-[var(--ciq-ink)]/75">
                          <IconCheck size={16} stroke={2.5} className="mt-0.5 shrink-0 text-[var(--ciq-pink)]" />
                          {flow.length ? <FlowSteps steps={flow} size="sm" /> : point}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="hidden items-center justify-center bg-[var(--ciq-mist)] p-5 sm:flex">
                  <ChannelPoster channel={posterChannel(product.slug)} compact className="max-w-[300px]" />
                </div>
              </Link>
              </TiltCard>
            );
          })}
        </Reveal3D>
      </section>
    </div>
  );
}
