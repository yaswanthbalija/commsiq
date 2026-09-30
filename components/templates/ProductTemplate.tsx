import Link from "next/link";
import type { ReactNode } from "react";
import { IconCheck } from "@tabler/icons-react";
import type { ProductPage } from "@/lib/content/products";
import { ChannelConsole } from "@/components/ui/ChannelBoard";
import { ChannelPoster, posterChannel } from "@/components/ui/ChannelPoster";
import { ChannelLogo } from "@/components/ui/ChannelLogo";
import { FlowSteps, FlowText, splitFlow } from "@/components/ui/Flow";
import { PhoneFrame, phoneScreens, type PhoneChannel } from "@/components/ui/PhoneScreens";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal3D } from "@/components/motion/Reveal3D";
import { RollText } from "@/components/motion/RollText";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";

const phoneChannels: PhoneChannel[] = ["sms", "whatsapp", "rcs", "voice"];

function isPhoneChannel(slug: string): slug is PhoneChannel {
  return (phoneChannels as string[]).includes(slug);
}

/** Feature copy is a comma-separated list in the source; render it as a checklist when so. */
function bodyToList(body: string): string[] | null {
  const colon = body.indexOf(":");
  if (colon === -1) return null;
  const list = body.slice(colon + 1).replace(/\.$/, "");
  if (/→/.test(list)) return null;
  const items = list.split(/,\s*|\s+and\s+/).map((s) => s.trim()).filter(Boolean);
  return items.length >= 4 ? items : null;
}

function FeatureRow({
  index,
  title,
  body,
  slug,
}: {
  index: number;
  title: string;
  body: string;
  slug: string;
}) {
  const list = bodyToList(body);
  const lead = list ? body.slice(0, body.indexOf(":") + 1) : null;
  const flip = index % 2 === 1;
  const Screen = isPhoneChannel(slug) ? phoneScreens[slug] : null;

  return (
    <Reveal3D
      selector="[data-row-part]"
      stagger={0.12}
      tilt={8}
      className={cn(
        "grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16",
        index > 0 && "border-t border-[var(--ciq-ink)]/8",
      )}
    >
      <div data-row-part className={cn(flip && "lg:order-2")}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ciq-pink)]">
          {String(index + 1).padStart(2, "0")}
        </p>
        <TextReveal
          as="h3"
          text={title}
          className="mt-2 text-2xl font-bold tracking-tight text-[var(--ciq-ink)] md:text-3xl"
        />
        {list ? (
          <>
            <p className="mt-4 text-base leading-7 text-[var(--ciq-ink)]/70">{lead}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {list.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[15px] text-[var(--ciq-ink)]/80">
                  <IconCheck size={18} stroke={2.5} className="mt-0.5 shrink-0 text-[var(--ciq-pink)]" />
                  <span className="capitalize">{item}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <FlowText text={body} className="mt-4 text-base leading-7 text-[var(--ciq-ink)]/70" />
        )}
      </div>
      <div data-row-part className={cn("flex justify-center", flip && "lg:order-1")}>
        <Parallax distance={-40}>
          <RowVisual index={index} title={title} body={body} slug={slug} Screen={Screen} />
        </Parallax>
      </div>
    </Reveal3D>
  );
}

/**
 * Each feature row gets a different visual so the page reads like a product tour:
 * phone screen, specification table, live console, then the journey the channel feeds.
 */
function RowVisual({
  index,
  title,
  body,
  slug,
  Screen,
}: {
  index: number;
  title: string;
  body: string;
  slug: string;
  Screen: (() => ReactNode) | null;
}) {
  const flow = splitFlow(body);
  if (flow.length >= 3) return <JourneyPanel steps={flow} />;

  const variant = index % 3;
  if (variant === 0 && Screen) {
    return (
      <PhoneFrame className="w-[230px]">
        <Screen />
      </PhoneFrame>
    );
  }
  if (variant === 1) return <SpecPanel title={title} slug={slug} index={index} />;
  if (isPhoneChannel(slug)) return <ChannelConsole channel={slug} />;
  return <SpecPanel title={title} slug={slug} index={index} />;
}

/** Vertical journey with channel marks, used when the feature copy describes a hand-off. */
function JourneyPanel({ steps }: { steps: string[] }) {
  return (
    <div className="w-full max-w-[400px] rounded-2xl border border-[var(--ciq-ink)]/10 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(5,5,8,0.35)]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ciq-ink)]/45">Connected journey</p>
      <ol className="relative mt-4">
        <span className="absolute bottom-5 left-[17px] top-5 w-px bg-[var(--ciq-ink)]/15" aria-hidden />
        {steps.map((step, i) => (
          <li key={step} className="relative flex items-center gap-4 py-2.5">
            <ChannelLogo channel={step} size="md" className="relative z-10" />
            <div>
              <p className="text-[15px] font-semibold text-[var(--ciq-ink)]">{step}</p>
              <p className="text-[11px] text-[var(--ciq-ink)]/50">Step {i + 1} of {steps.length}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Product-specific fact panel used on alternating rows so every row has a real visual. */
function SpecPanel({ title, slug, index }: { title: string; slug: string; index: number }) {
  const specs: Record<string, readonly { k: string; v: string }[]> = {
    sms: [
      { k: "Throughput", v: "10,000+ msgs / sec" },
      { k: "Delivery receipts", v: "Real-time DLR" },
      { k: "Compliance", v: "DLT, TRAI, opt-out" },
      { k: "Integration", v: "REST API, SMPP, CRM" },
      { k: "Sender", v: "Registered header" },
    ],
    whatsapp: [
      { k: "Account", v: "Verified business" },
      { k: "Message types", v: "Template, session, interactive" },
      { k: "Media", v: "Image, video, PDF, location" },
      { k: "Automation", v: "Bot to live agent" },
      { k: "Commerce", v: "Catalog, cart, payments" },
    ],
    rcs: [
      { k: "Sender", v: "Verified brand profile" },
      { k: "Formats", v: "Rich card, carousel, media" },
      { k: "Actions", v: "Call, URL, calendar, map" },
      { k: "Fallback", v: "Automatic SMS" },
      { k: "Analytics", v: "Read, tap, reply" },
    ],
    voice: [
      { k: "Numbers", v: "Virtual, toll-free, DID" },
      { k: "IVR", v: "Multi-level, DTMF, TTS" },
      { k: "Routing", v: "Skill, time, geography" },
      { k: "Click-to-Call", v: "Web, app, RCS, WhatsApp" },
      { k: "Recording", v: "Secure, searchable" },
    ],
  };
  const rows = specs[slug] ?? specs.sms;
  return (
    <div className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-[var(--ciq-ink)]/10 bg-white shadow-[0_24px_60px_-24px_rgba(5,5,8,0.35)]">
      <div className="flex items-center gap-3 border-b border-[var(--ciq-ink)]/8 px-5 py-3.5">
        <ChannelLogo channel={slug} size="md" />
        <div className="leading-tight">
          <p className="text-[13px] font-semibold text-[var(--ciq-ink)]">{title}</p>
          <p className="text-[11px] text-[var(--ciq-ink)]/55">Specification · {slug.toUpperCase()}</p>
        </div>
      </div>
      <dl className="divide-y divide-[var(--ciq-ink)]/6">
        {rows.map((row, i) => (
          <div
            key={row.k}
            className={cn("grid grid-cols-[120px_1fr] gap-3 px-5 py-3 text-[13px]", (i + index) % 2 === 1 && "bg-[var(--ciq-mist)]/60")}
          >
            <dt className="text-[var(--ciq-ink)]/55">{row.k}</dt>
            <dd className="font-medium text-[var(--ciq-ink)]">{row.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ProductTemplate({ product }: { product: ProductPage }) {
  const journeySteps = product.journey ? splitFlow(product.journey) : [];

  return (
    <div>
      <section className="ciq-page-hero">
        <div className="kx-container grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
          <div>
            <div className="flex items-center gap-3">
              <ChannelLogo channel={product.slug} size="lg" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ciq-pink)]">
                {product.eyebrow}
              </p>
            </div>
            <TextReveal
              as="h1"
              text={product.headline}
              trigger="splash"
              stagger={0.06}
              className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-white md:text-5xl"
            />
            <Reveal3D tilt={0} stagger={0.1}>
              <p className="mt-4 max-w-xl text-lg leading-7 text-white/75">{product.summary}</p>
              {product.body ? (
                <p className="mt-4 max-w-xl text-base leading-7 text-white/60">{product.body}</p>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/#contact" className="btn-pink">
                  <RollText>Talk to CPaaS expert</RollText>
                </Link>
                <Link href="/#contact" className="btn-outline-light">
                  <RollText>Request a demo</RollText>
                </Link>
              </div>
            </Reveal3D>
          </div>
          <Parallax distance={-50} scaleFrom={0.94} className="relative h-[500px] lg:h-[540px]">
            <ChannelPoster channel={posterChannel(product.slug)} title={product.name} className="max-w-[440px]" />
          </Parallax>
        </div>
      </section>

      {product.groups?.length ? (
        <section className="ciq-page-body">
          <div className="kx-container py-16 lg:pt-24">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <TextReveal
                  text={`What you can send with ${product.name}`}
                  accent={[product.name]}
                  className="text-3xl font-bold text-[var(--ciq-ink)]"
                />
                <p className="mt-3 text-base leading-7 text-[var(--ciq-ink)]/65">{product.summary}</p>
              </div>
              <Reveal3D className="grid gap-6 sm:grid-cols-2">
                {product.groups.map((group) => (
                  <div key={group.title} className="rounded-2xl border border-[var(--ciq-ink)]/8 bg-white p-6">
                    <h3 className="text-base font-bold text-[var(--ciq-ink)]">{group.title}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {group.items.map((item) => {
                        const flow = splitFlow(item);
                        return (
                          <li key={item} className="flex items-start gap-2 text-[15px] text-[var(--ciq-ink)]/80">
                            <IconCheck size={18} stroke={2.5} className="mt-0.5 shrink-0 text-[var(--ciq-pink)]" />
                            {flow.length ? <FlowSteps steps={flow} size="sm" /> : item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </Reveal3D>
            </div>
          </div>
        </section>
      ) : null}

      <section className={product.groups?.length ? "ciq-section-soft" : "ciq-page-body"}>
        <div className="kx-container py-8 lg:py-12">
          {product.features.map((feature, index) => (
            <FeatureRow
              key={feature.title}
              index={index}
              title={feature.title}
              body={feature.body}
              slug={product.slug}
            />
          ))}
        </div>
      </section>

      {journeySteps.length ? (
        <section className="ciq-section-brand">
          <div className="kx-container relative py-14">
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--ciq-pink)] uppercase">
              Connected Journey
            </p>
            <TextReveal
              text={`${product.name} is the start, not the end, of the conversation.`}
              accent={["start,", "conversation."]}
              className="mt-3 max-w-2xl text-2xl font-bold text-white md:text-3xl"
            />
            <Reveal3D tilt={0} className="mt-6">
              <FlowSteps steps={journeySteps} tone="dark" />
            </Reveal3D>
          </div>
        </section>
      ) : null}

      <section className="bg-white">
        <div className="kx-container grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-bold text-[var(--ciq-ink)]">Frequently asked questions</h2>
            <p className="mt-3 text-sm text-[var(--ciq-ink)]/55">
              Looking for another channel?{" "}
              <Link href="/products" className="text-[var(--ciq-blue)] hover:underline">
                Browse all products
              </Link>
            </p>
          </div>
          <Reveal3D tilt={0} className="divide-y divide-[var(--ciq-ink)]/8">
            {product.faqs.map((faq) => (
              <details key={faq.q} className="group py-4">
                <summary className="cursor-pointer list-none text-base font-semibold text-[var(--ciq-ink)]">
                  {faq.q}
                </summary>
                <p className="mt-3 text-[15px] leading-7 text-[var(--ciq-ink)]/70">{faq.a}</p>
              </details>
            ))}
          </Reveal3D>
        </div>
      </section>
    </div>
  );
}
