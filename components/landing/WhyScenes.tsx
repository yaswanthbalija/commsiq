import { IconBolt, IconShieldCheck, IconUserCheck, IconWebhook } from "@tabler/icons-react";
import { ChannelLogo } from "@/components/ui/ChannelLogo";

/**
 * Live micro-scenes for the Why commsIQ grid. Pure CSS / SVG animation,
 * each one demonstrates the point it sits beside.
 */

/** 1. Omnichannel — four channels converge into one core. */
export function SceneConverge() {
  const chans = ["sms", "whatsapp", "rcs", "voice"] as const;
  return (
    <div className="relative h-[168px] w-full">
      <svg viewBox="0 0 400 168" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        {chans.map((c, i) => {
          const y = 24 + i * 40;
          return (
            <g key={c}>
              <path d={`M56 ${y} C 180 ${y}, 220 84, 330 84`} stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
              <path
                d={`M56 ${y} C 180 ${y}, 220 84, 330 84`}
                stroke="url(#ciq-conv)"
                strokeWidth="2"
                strokeDasharray="14 260"
                className="ciq-dash-run"
                style={{ animationDelay: `${i * 0.45}s`, animationDuration: "2.4s" }}
              />
            </g>
          );
        })}
        <defs>
          <linearGradient id="ciq-conv" x1="0" x2="1">
            <stop offset="0" stopColor="#2da8ff" />
            <stop offset="0.5" stopColor="#9b4dff" />
            <stop offset="1" stopColor="#ff2d8b" />
          </linearGradient>
        </defs>
      </svg>
      <ul className="absolute left-0 top-0 flex flex-col gap-[12px] pt-[10px]">
        {chans.map((c) => (
          <li key={c} className="h-7">
            <ChannelLogo channel={c} size="sm" />
          </li>
        ))}
      </ul>
      <div className="absolute right-[6%] top-1/2 -translate-y-1/2">
        <span className="ciq-pulse-ring absolute inset-0 rounded-full border border-[#9b4dff]" aria-hidden />
        <span className="relative flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#ff2d8b,#9b4dff_60%,#2da8ff)] shadow-[0_0_40px_rgba(155,77,255,0.6)]">
          <span className="text-[12px] font-extrabold tracking-tight text-white">IQ</span>
        </span>
      </div>
    </div>
  );
}

/** 2. Journey — nodes light in sequence along a path. */
export function SceneJourney() {
  const steps = ["Signup", "Verify", "Nudge", "Convert"];
  return (
    <div className="relative h-[120px] w-full">
      <span className="absolute left-3 right-3 top-[26px] h-px bg-white/12" aria-hidden />
      <span className="ciq-journey-fill absolute left-3 top-[26px] h-px bg-gradient-to-r from-[#2da8ff] via-[#9b4dff] to-[#ff2d8b]" aria-hidden />
      <ul className="relative flex justify-between px-1">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-col items-center gap-3">
            <span className="ciq-journey-node relative flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/12 bg-[#0f0f1a]" style={{ animationDelay: `${i * 0.7}s` }}>
              <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 3. Conversations — automated → rich → human, looping. */
export function SceneConversation() {
  return (
    <div className="relative flex h-[176px] w-full flex-col justify-end gap-2">
      <div className="ciq-bubble self-start rounded-2xl rounded-bl-md bg-white/[0.08] px-3 py-2 text-[12px] text-white/85" style={{ animationDelay: "0s" }}>
        Your order #48213 has shipped.
      </div>
      <div className="ciq-bubble self-start overflow-hidden rounded-2xl rounded-bl-md border border-white/10 bg-[#0f0f1a] text-[12px]" style={{ animationDelay: "1.4s" }}>
        <div className="h-10 bg-[linear-gradient(120deg,#2da8ff,#9b4dff)]" />
        <div className="px-3 py-2 text-white/85">Track live · Reschedule · Talk to us</div>
      </div>
      <div className="ciq-bubble flex items-center gap-2 self-end rounded-2xl rounded-br-md bg-[#ff2d8b] px-3 py-2 text-[12px] font-medium text-white" style={{ animationDelay: "2.8s" }}>
        <IconUserCheck size={14} /> Agent Priya joined
      </div>
    </div>
  );
}

/** 4. API — a request typed out, then accepted. */
export function SceneApi() {
  return (
    <div className="relative h-[140px] w-full overflow-hidden rounded-xl border border-white/10 bg-[#07070d] p-4 font-mono text-[12px] leading-6">
      <p className="text-white/40">$ curl api.commsiq.io/v1/messages</p>
      <p className="ciq-type text-white/90" style={{ animationDelay: "0.4s" }}>
        <span className="text-[#2da8ff]">POST</span> {"{"} channel: <span className="text-[#25d366]">&quot;whatsapp&quot;</span>, to: <span className="text-[#ff2d8b]">&quot;+91…&quot;</span> {"}"}
      </p>
      <p className="ciq-type text-white/90" style={{ animationDelay: "2s" }}>
        <span className="text-[#25d366]">202 Accepted</span> · id: msg_7f3a9c
      </p>
      <span className="ciq-cursor absolute bottom-4 left-4 h-4 w-2 bg-[#9b4dff]" aria-hidden />
    </div>
  );
}

/** 5. Automation — event → rule → action with a travelling pulse. */
export function SceneAutomation() {
  const nodes = [
    { label: "Cart abandoned", Icon: IconWebhook, c: "#2da8ff" },
    { label: "Wait 30 min", Icon: IconBolt, c: "#9b4dff" },
    { label: "Send WhatsApp", Icon: IconBolt, c: "#25d366" },
  ];
  return (
    <div className="relative h-[120px] w-full">
      <span className="absolute left-6 right-6 top-[24px] h-px bg-white/12" aria-hidden />
      <span className="ciq-auto-pulse absolute top-[20px] h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_16px_#fff]" aria-hidden />
      <ul className="relative flex justify-between">
        {nodes.map((n) => (
          <li key={n.label} className="flex w-[30%] flex-col items-center gap-2 text-center">
            <span className="flex h-[48px] w-[48px] items-center justify-center rounded-xl border border-white/10 bg-[#0f0f1a]" style={{ color: n.c }}>
              <n.Icon size={20} />
            </span>
            <span className="text-[11px] font-medium text-white/65">{n.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 6. Analytics — bars rise, delivery rate resolves. */
export function SceneAnalytics() {
  const bars = [42, 58, 51, 70, 66, 82, 78, 91, 88, 96, 93, 98];
  return (
    <div className="relative flex h-[168px] w-full items-end gap-6">
      <div className="flex h-full flex-1 items-end gap-[6px]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="ciq-bar flex-1 rounded-t-sm bg-gradient-to-t from-[#2da8ff] via-[#9b4dff] to-[#ff2d8b]"
            style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>
      <dl className="grid shrink-0 grid-cols-1 gap-3 text-right">
        {[
          ["98.7%", "Delivered"],
          ["64%", "Read"],
          ["21%", "Clicked"],
        ].map(([v, k]) => (
          <div key={k}>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">{k}</dt>
            <dd className="font-mono text-[22px] font-semibold tabular-nums text-white">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** 7. Enterprise — shield with rings and compliance badges. */
export function SceneEnterprise() {
  return (
    <div className="relative flex h-[140px] w-full items-center gap-6">
      <div className="relative flex h-[96px] w-[96px] shrink-0 items-center justify-center">
        <span className="ciq-pulse-ring absolute inset-0 rounded-full border border-[#25d366]/70" aria-hidden />
        <span className="ciq-pulse-ring absolute inset-0 rounded-full border border-[#2da8ff]/70" style={{ animationDelay: "0.9s" }} aria-hidden />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#25d366,#2da8ff)] text-white shadow-[0_0_40px_rgba(37,211,102,0.45)]">
          <IconShieldCheck size={30} />
        </span>
      </div>
      <ul className="flex flex-wrap gap-2">
        {["TLS 1.3", "DLT compliant", "Consent ledger", "99.99% uptime", "Role-based access"].map((t) => (
          <li key={t} className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-white/75">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
