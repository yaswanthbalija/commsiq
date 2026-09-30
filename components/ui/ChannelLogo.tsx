import type { ComponentType, ReactNode } from "react";
import {
  IconBrandGoogle,
  IconBrandWhatsapp,
  IconDeviceMobileMessage,
  IconDeviceTv,
  IconHeadset,
  IconPhoneCall,
  IconRoute,
  IconTargetArrow,
  IconUsers,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type ChannelKey =
  | "sms"
  | "whatsapp"
  | "rcs"
  | "voice"
  | "omnichannel"
  | "growth"
  | "audience"
  | "advertising"
  | "contact-centre";

type Spec = {
  label: string;
  Icon: ComponentType<{ size?: number; stroke?: number; className?: string }>;
  fg: string;
  bg: string;
};

const SPECS: Record<ChannelKey, Spec> = {
  sms: { label: "SMS", Icon: IconDeviceMobileMessage, fg: "#0b0b12", bg: "#e9ecf3" },
  whatsapp: { label: "WhatsApp", Icon: IconBrandWhatsapp, fg: "#ffffff", bg: "#25d366" },
  rcs: { label: "RCS", Icon: IconBrandGoogle, fg: "#ffffff", bg: "#1a73e8" },
  voice: { label: "Voice", Icon: IconPhoneCall, fg: "#ffffff", bg: "#ff2d8b" },
  "contact-centre": { label: "Contact Centre", Icon: IconHeadset, fg: "#ffffff", bg: "#9b4dff" },
  omnichannel: { label: "Omnichannel", Icon: IconRoute, fg: "#ffffff", bg: "#9b4dff" },
  growth: { label: "Growth Stack", Icon: IconTargetArrow, fg: "#ffffff", bg: "#0b0b12" },
  audience: { label: "Audience", Icon: IconUsers, fg: "#ffffff", bg: "#2da8ff" },
  advertising: { label: "Advertising", Icon: IconDeviceTv, fg: "#ffffff", bg: "#6094ea" },
};

/** Map free text (channel names, feature titles) to a channel key. */
export function channelKeyFor(text: string | undefined | null): ChannelKey | null {
  if (!text) return null;
  const t = text.toLowerCase();
  if (t.includes("whatsapp")) return "whatsapp";
  if (t.includes("rcs")) return "rcs";
  if (/\bsms\b|otp/.test(t)) return "sms";
  if (/contact centre|ivr|agent/.test(t)) return "contact-centre";
  if (/voice|call|telephony|dialer/.test(t)) return "voice";
  if (/omnichannel|middleware|journey/.test(t)) return "omnichannel";
  if (/audience|cohort/.test(t)) return "audience";
  if (/programmatic|display|video|ott|ctv|connected tv|mobile ad|advertis/.test(t)) return "advertising";
  if (/growth|intel/.test(t)) return "growth";
  return null;
}

type Props = {
  channel: ChannelKey | string;
  size?: "sm" | "md" | "lg";
  withLabel?: boolean;
  className?: string;
  /** Custom label text; overrides the built-in label when provided. */
  children?: ReactNode;
};

const SIZES = {
  sm: { box: "h-7 w-7 rounded-md", icon: 16 },
  md: { box: "h-9 w-9 rounded-lg", icon: 20 },
  lg: { box: "h-12 w-12 rounded-xl", icon: 26 },
} as const;

/** Brand-coloured channel mark (Tabler brand icons). */
export function ChannelLogo({ channel, size = "md", withLabel = false, className, children }: Props) {
  const key = (channel in SPECS ? channel : channelKeyFor(channel) ?? "sms") as ChannelKey;
  const spec = SPECS[key];
  const s = SIZES[size];
  const label = children ?? (withLabel ? spec.label : null);
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn("inline-flex shrink-0 items-center justify-center", s.box)}
        style={{ background: spec.bg, color: spec.fg }}
        aria-hidden={label === null}
        title={spec.label}
      >
        <spec.Icon size={s.icon} stroke={1.8} />
      </span>
      {label !== null ? <span className="text-sm font-semibold text-current">{label}</span> : null}
    </span>
  );
}
