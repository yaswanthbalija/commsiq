import {
  IconBrandGoogle,
  IconBrandWhatsapp,
  IconChecks,
  IconMessage,
  IconPhoneCall,
  IconRoute,
  IconTrendingUp,
} from "@tabler/icons-react";
import { LiveScene } from "@/components/motion/LiveScene";
import { OrbitDiagram } from "@/components/ui/OrbitDiagram";
import { cn } from "@/lib/utils";

const step = (i: number) => ({ ["--i" as string]: i });

export type PosterChannel = "sms" | "whatsapp" | "rcs" | "voice" | "omnichannel" | "growth";

const THEME: Record<PosterChannel, { bg: string; Icon: typeof IconMessage; label: string; stat: string; statLabel: string }> = {
  sms: { bg: "from-[#0a2a6e] via-[#0b1f55] to-[#050508]", Icon: IconMessage, label: "SMS", stat: "99.2%", statLabel: "delivered in 1.4 s" },
  whatsapp: { bg: "from-[#0b3d2e] via-[#07271f] to-[#050508]", Icon: IconBrandWhatsapp, label: "WhatsApp Business", stat: "71%", statLabel: "resolved by automation" },
  rcs: { bg: "from-[#0d2147] via-[#0a1628] to-[#050508]", Icon: IconBrandGoogle, label: "RCS Business Messaging", stat: "82%", statLabel: "rich cards read" },
  voice: { bg: "from-[#5a0f3a] via-[#2a0b2e] to-[#050508]", Icon: IconPhoneCall, label: "Voice", stat: "18 s", statLabel: "average speed of answer" },
  omnichannel: { bg: "from-[#07112b] via-[#0b0b12] to-[#050508]", Icon: IconRoute, label: "Omnichannel", stat: "1", statLabel: "timeline per customer" },
  growth: { bg: "from-[#3a0f5a] via-[#1a0b2e] to-[#050508]", Icon: IconTrendingUp, label: "Growth Stack", stat: "5", statLabel: "lifecycle stages connected" },
};

/* ---- signature motion per channel ---- */

function Odometer({ code }: { code: string }) {
  return (
    <div className="flex gap-1.5 font-mono text-[clamp(2rem,6cqw,3.4rem)] font-bold tabular-nums text-white">
      {code.split("").map((d, i) => (
        <span key={i} className="h-[1.1em] w-[0.7em] overflow-hidden rounded-lg bg-white/[0.08] ring-1 ring-white/10">
          <span className="ciq-odometer block leading-[1.1em]" style={{ ["--to" as string]: d, animationDelay: `${0.2 + i * 0.12}s` }}>
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n} className="block text-center">
                {n}
              </span>
            ))}
          </span>
        </span>
      ))}
    </div>
  );
}

function SmsArt() {
  return (
    <div className="space-y-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">One-time password</p>
      <Odometer code="482913" />
      <div className="live-fade flex items-center gap-2 text-[12px] text-white/70" style={step(4)}>
        <IconChecks size={16} className="text-[#2da8ff]" /> Delivered · DLT template approved
      </div>
    </div>
  );
}

function WhatsappArt() {
  const rows = [78, 56, 88];
  return (
    <div className="space-y-2.5">
      {rows.map((wdt, i) => (
        <div key={i} className="live-msg flex items-center gap-2" style={step(i)}>
          <span className="h-9 rounded-2xl rounded-bl-md bg-white/[0.12]" style={{ width: `${wdt}%` }} />
          <IconChecks size={18} className="live-tick shrink-0" style={step(i)} />
        </div>
      ))}
      <div className="live-msg live-msg--right ml-auto flex h-9 w-[46%] items-center justify-end rounded-2xl rounded-br-md bg-[#25d366]/80 px-3 text-[12px] font-semibold text-white" style={step(3)}>
        Yes, confirm
      </div>
    </div>
  );
}

function RcsArt() {
  return (
    <div className="[perspective:900px]">
      <div className="ciq-flip-in overflow-hidden rounded-2xl bg-white text-[#202124] shadow-[0_30px_60px_-20px_rgba(5,5,8,0.7)]">
        <div className="h-24 bg-[linear-gradient(120deg,#2da8ff,#9b4dff)]" />
        <div className="p-3">
          <p className="text-[13px] font-bold">Nova EV · Book a test drive</p>
          <p className="text-[11px] text-[#5f6368]">480 km range · Fast charge</p>
        </div>
      </div>
      <div className="mt-2.5 flex gap-1.5">
        {["Book test drive", "Call showroom", "View offers"].map((c, i) => (
          <span key={c} className="live-chip rounded-full border border-white/25 px-2.5 py-1 text-[10px] font-semibold text-white" style={step(i)}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function VoiceArt() {
  return (
    <div>
      <div className="live-wave flex h-[72px] items-end gap-[5px]">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="w-[6px] rounded-full bg-[linear-gradient(180deg,#ff2d8b,#9b4dff)]"
            style={{ height: `${14 + ((i * 13) % 52)}px`, ...step(i) }}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 text-[12px] text-white/70">
        <span className="live-ring relative inline-flex h-2.5 w-2.5 rounded-full bg-[#34c759] text-[#34c759]" />
        Connected to Sales · Agent Rohan · 02:14
      </div>
    </div>
  );
}

function GrowthArt() {
  const stages = [
    ["Reach", 100],
    ["Engage", 74],
    ["Converse", 52],
    ["Convert", 31],
  ] as const;
  return (
    <div className="space-y-2.5">
      {stages.map(([label, wdt], i) => (
        <div key={label} className="flex items-center gap-3 text-[12px] text-white/80">
          <span className="w-16 font-semibold">{label}</span>
          <span className="h-3 flex-1 overflow-hidden rounded-full bg-white/10">
            <span className="live-bar block h-full rounded-full bg-[linear-gradient(90deg,#ff2d8b,#9b4dff,#2da8ff)]" style={{ ["--w" as string]: `${wdt}%`, ...step(i) }} />
          </span>
        </div>
      ))}
    </div>
  );
}

function Art({ channel }: { channel: PosterChannel }) {
  switch (channel) {
    case "sms":
      return <SmsArt />;
    case "whatsapp":
      return <WhatsappArt />;
    case "rcs":
      return <RcsArt />;
    case "voice":
      return <VoiceArt />;
    case "growth":
      return <GrowthArt />;
    default:
      return <OrbitDiagram compact className="max-w-[260px]" />;
  }
}

export function posterChannel(value: string): PosterChannel {
  const v = value.toLowerCase();
  if (v.includes("whatsapp")) return "whatsapp";
  if (v.includes("rcs")) return "rcs";
  if (v.includes("voice") || v.includes("ivr") || v.includes("call")) return "voice";
  if (v.includes("sms") || v.includes("otp")) return "sms";
  if (v.includes("growth") || v.includes("intel") || v.includes("funnel") || v.includes("audience") || v.includes("advert")) return "growth";
  return "omnichannel";
}

type Props = {
  channel: PosterChannel;
  title?: string;
  className?: string;
  /** Smaller type and padding for tiles. */
  compact?: boolean;
};

/**
 * Editorial poster for a channel: gradient field, oversized glyph watermark,
 * a signature live animation and one hard number. Replaces device mockups.
 */
export function ChannelPoster({ channel, title, className, compact = false }: Props) {
  const theme = THEME[channel];
  return (
    <LiveScene
      className={cn(
        "relative isolate flex w-full flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-br text-white shadow-[0_40px_90px_-30px_rgba(5,5,8,0.8)] ring-1 ring-white/10 [container-type:inline-size]",
        theme.bg,
        compact ? "aspect-[4/3] p-5" : "aspect-[4/5] p-7 md:p-8",
        className,
      )}
    >
      <theme.Icon
        aria-hidden
        stroke={1}
        className="pointer-events-none absolute -right-8 -top-8 h-[62%] w-auto opacity-[0.07]"
      />
      <div className="ciq-shine pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
        <theme.Icon size={16} /> {title ?? theme.label}
      </div>

      <div className="relative my-6">
        <Art channel={channel} />
      </div>

      <div className="relative flex items-end justify-between">
        <div>
          <p className={cn("ciq-gradient-text font-extrabold tracking-tight", compact ? "text-3xl" : "text-5xl")}>{theme.stat}</p>
          <p className="mt-1 text-[12px] text-white/60">{theme.statLabel}</p>
        </div>
        <span className="live-dot h-2 w-2 rounded-full bg-[#34c759]" aria-hidden />
      </div>
    </LiveScene>
  );
}
