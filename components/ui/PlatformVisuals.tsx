import { ChannelLogo } from "@/components/ui/ChannelLogo";
import { LiveScene } from "@/components/motion/LiveScene";
import { cn } from "@/lib/utils";

const step = (i: number) => ({ ["--i" as string]: i });

/* ---------- Journey Orchestration: trigger to next-best-interaction ---------- */
export function OrchestrationVisual() {
  const lanes = [
    { title: "Trigger", node: "Cart abandoned", meta: "Shopify webhook · 21:04" },
    { title: "Decide", node: "Customer opted-in WhatsApp?", meta: "Rule · consent + last channel" },
    { title: "Engage", node: "WhatsApp reminder with cart", meta: "Template · cart_recovery_v3", channel: "whatsapp" },
    { title: "Respond", node: "No reply in 2 h", meta: "Wait · 120 min" },
    { title: "Next best", node: "SMS with 10% code", meta: "Fallback · promo_10", channel: "sms" },
  ] as const;

  return (
    <LiveScene className="w-full max-w-[460px] overflow-hidden rounded-2xl border border-[var(--ciq-ink)]/10 bg-white shadow-[0_24px_60px_-24px_rgba(5,5,8,0.35)]">
      <div className="flex items-center justify-between border-b border-[var(--ciq-ink)]/8 px-5 py-3">
        <p className="text-[12px] font-semibold text-[var(--ciq-ink)]">Journey · Cart recovery</p>
        <span className="flex items-center gap-1.5 rounded-full bg-[#e8f7ee] px-2 py-0.5 text-[10px] font-semibold text-[#0f9d58]">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#0f9d58]" /> Live
        </span>
      </div>
      <ol className="relative px-5 py-4">
        <span className="absolute bottom-8 left-[38px] top-8 w-px border-l border-dashed border-[var(--ciq-ink)]/20" aria-hidden />
        <span className="live-route absolute bottom-8 left-[37px] top-8 w-[3px] overflow-hidden rounded-full" aria-hidden />
        {lanes.map((lane, i) => (
          <li key={lane.title} className="live-card relative flex items-start gap-3 py-2" style={step(i)}>
            <span
              className={cn(
                "relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                i === 0 ? "bg-[var(--ciq-pink)] text-white" : "bg-[var(--ciq-mist)] text-[var(--ciq-ink)]",
              )}
            >
              {i + 1}
            </span>
            <div className="flex-1 rounded-xl border border-[var(--ciq-ink)]/8 bg-[var(--ciq-mist)]/50 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ciq-ink)]/45">{lane.title}</p>
              <p className="mt-0.5 flex items-center gap-2 text-[13px] font-medium text-[var(--ciq-ink)]">
                {"channel" in lane ? <ChannelLogo channel={lane.channel} size="sm" /> : null}
                {lane.node}
              </p>
              <p className="text-[11px] text-[var(--ciq-ink)]/55">{lane.meta}</p>
            </div>
          </li>
        ))}
      </ol>
    </LiveScene>
  );
}

/* ---------- APIs: a request that fans out to channels ---------- */
export function ApiVisual() {
  const lines = [
    ["POST", " /v1/messages"],
    ["Authorization:", " Bearer ciq_live_••••"],
    ["", ""],
    ["{", ""],
    ['  "to": ', '"+919876543210",'],
    ['  "channel": ', '"whatsapp",'],
    ['  "fallback": ', '["rcs", "sms"],'],
    ['  "template": ', '"order_shipped",'],
    ['  "params": ', '{ "order": "A1029", "eta": "Tue" }'],
    ["}", ""],
  ] as const;
  return (
    <LiveScene className="w-full max-w-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b12] shadow-[0_24px_60px_-24px_rgba(5,5,8,0.6)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-white/50">send-message.http</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12px] leading-[1.6] text-white/85">
        {lines.map(([a, b], i) => (
          <div key={i} className="live-line min-h-[1.6em]" style={step(i)}>
            <span className="text-[#2da8ff]">{a}</span>
            <span className="text-[#ffd479]">{b}</span>
          </div>
        ))}
      </pre>
      <div className="live-fade border-t border-white/10 px-4 py-3" style={step(4)}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">Response · 202 Accepted</p>
        <p className="mt-1 font-mono text-[12px] text-[#7ee787]">
          {'{ "id": "msg_8f2a", "status": "queued", "channel": "whatsapp" }'}
        </p>
      </div>
    </LiveScene>
  );
}

/* ---------- Analytics: delivery and engagement by channel ---------- */
export function AnalyticsVisual() {
  const bars = [
    { channel: "sms", label: "SMS", delivered: 99, engaged: 12 },
    { channel: "whatsapp", label: "WhatsApp", delivered: 97, engaged: 58 },
    { channel: "rcs", label: "RCS", delivered: 91, engaged: 46 },
    { channel: "voice", label: "Voice", delivered: 88, engaged: 71 },
  ] as const;
  const funnel = [
    { label: "Sent", value: "1,248,310" },
    { label: "Delivered", value: "1,220,451" },
    { label: "Engaged", value: "412,900" },
    { label: "Converted", value: "38,120" },
  ];
  return (
    <LiveScene className="w-full max-w-[460px] overflow-hidden rounded-2xl border border-[var(--ciq-ink)]/10 bg-white shadow-[0_24px_60px_-24px_rgba(5,5,8,0.35)]">
      <div className="flex items-center justify-between border-b border-[var(--ciq-ink)]/8 px-5 py-3">
        <p className="text-[12px] font-semibold text-[var(--ciq-ink)]">Campaign performance · last 7 days</p>
        <span className="text-[11px] text-[var(--ciq-ink)]/50">All channels</span>
      </div>
      <div className="grid grid-cols-4 divide-x divide-[var(--ciq-ink)]/8 border-b border-[var(--ciq-ink)]/8">
        {funnel.map((f, i) => (
          <div key={f.label} className="live-pop px-3 py-3" style={step(i)}>
            <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--ciq-ink)]/45">{f.label}</p>
            <p className="mt-0.5 text-[13px] font-bold tabular-nums text-[var(--ciq-ink)]">{f.value}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3 px-5 py-4">
        {bars.map((b, i) => (
          <div key={b.label} className="flex items-center gap-3">
            <ChannelLogo channel={b.channel} size="sm" />
            <span className="w-16 text-[12px] font-medium text-[var(--ciq-ink)]">{b.label}</span>
            <div className="flex-1 space-y-1">
              <div className="h-2 rounded-full bg-[var(--ciq-mist)]">
                <div
                  className="live-bar h-2 rounded-full bg-[var(--ciq-blue)]"
                  style={{ ["--w" as string]: `${b.delivered}%`, ...step(i * 2) }}
                />
              </div>
              <div className="h-2 rounded-full bg-[var(--ciq-mist)]">
                <div
                  className="live-bar h-2 rounded-full bg-[var(--ciq-pink)]"
                  style={{ ["--w" as string]: `${b.engaged}%`, ...step(i * 2 + 1) }}
                />
              </div>
            </div>
            <span className="w-[74px] text-right text-[11px] tabular-nums text-[var(--ciq-ink)]/65">
              {b.delivered}% · {b.engaged}%
            </span>
          </div>
        ))}
        <div className="flex gap-4 pt-1 text-[10px] text-[var(--ciq-ink)]/55">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--ciq-blue)]" /> Delivered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--ciq-pink)]" /> Engaged
          </span>
        </div>
      </div>
    </LiveScene>
  );
}

/* ---------- Channel handoff: "SMS → WhatsApp" rendered as two marks ---------- */
export function HandoffMark({ from, to }: { from: string; to: string }) {
  return (
    <div className="flex items-center gap-3">
      <ChannelLogo channel={from} size="lg" />
      <span className="h-px w-8 bg-[var(--ciq-ink)]/25" aria-hidden />
      <ChannelLogo channel={to} size="lg" />
    </div>
  );
}
