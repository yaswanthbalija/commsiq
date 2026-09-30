import { ChannelLogo } from "@/components/ui/ChannelLogo";
import { LiveScene } from "@/components/motion/LiveScene";
import { PhoneFrame, phoneScreens, type PhoneChannel } from "@/components/ui/PhoneScreens";
import { cn } from "@/lib/utils";

type Channel = PhoneChannel | "middleware" | "intel";

const step = (i: number) => ({ ["--i" as string]: i });

/** Console card that sits behind the phone: what the business sees. */
function ConsoleCard({
  title,
  rows,
  className,
}: {
  title: string;
  rows: readonly { label: string; value: string; tone?: "ok" | "warn" }[];
  className?: string;
}) {
  return (
    <LiveScene
      className={cn(
        "w-[240px] overflow-hidden rounded-xl border border-[#e3e6ef] bg-white text-[#0b0b12] shadow-[0_20px_50px_-18px_rgba(5,5,8,0.35)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[#eceef4] px-3.5 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5b6475]">{title}</p>
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        </span>
      </div>
      <dl className="divide-y divide-[#f0f2f7] text-[12px]">
        {rows.map((row, i) => (
          <div key={row.label} className="live-fade flex items-center justify-between px-3.5 py-2" style={step(i)}>
            <dt className="text-[#5b6475]">{row.label}</dt>
            <dd
              className={cn(
                "font-semibold tabular-nums",
                row.tone === "ok" && "text-[#0f9d58]",
                row.tone === "warn" && "text-[#e8710a]",
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </LiveScene>
  );
}

const consoles: Record<PhoneChannel, { title: string; rows: readonly { label: string; value: string; tone?: "ok" | "warn" }[] }> = {
  sms: {
    title: "SMS delivery · today",
    rows: [
      { label: "Submitted", value: "1,248,310" },
      { label: "Delivered", value: "99.2%", tone: "ok" },
      { label: "Avg latency", value: "1.4 s" },
      { label: "DLT templates", value: "Approved", tone: "ok" },
    ],
  },
  whatsapp: {
    title: "WhatsApp · conversations",
    rows: [
      { label: "Open threads", value: "184" },
      { label: "Bot resolved", value: "71%", tone: "ok" },
      { label: "Escalated to agent", value: "29" },
      { label: "Quality rating", value: "High", tone: "ok" },
    ],
  },
  rcs: {
    title: "RCS campaign · Nova EV",
    rows: [
      { label: "Rich cards sent", value: "48,200" },
      { label: "Read", value: "82%", tone: "ok" },
      { label: "Test drives booked", value: "910" },
      { label: "SMS fallback", value: "6%", tone: "warn" },
    ],
  },
  voice: {
    title: "Voice · live queue",
    rows: [
      { label: "In IVR", value: "31" },
      { label: "Waiting for agent", value: "4", tone: "warn" },
      { label: "Avg speed of answer", value: "18 s", tone: "ok" },
      { label: "Click-to-call today", value: "1,102" },
    ],
  },
};

/** Standalone console card for use in feature rows. */
export function ChannelConsole({ channel }: { channel: PhoneChannel }) {
  const console = consoles[channel];
  return <ConsoleCard title={console.title} rows={console.rows} className="w-full max-w-[400px]" />;
}

function PhoneWithConsole({ channel }: { channel: PhoneChannel }) {
  const Screen = phoneScreens[channel];
  const console = consoles[channel];
  return (
    <div className="relative mx-auto h-full w-full max-w-[430px]">
      {/* Console peeks out from behind the phone: the customer's screen in front, the business view behind. */}
      <ConsoleCard
        title={console.title}
        rows={console.rows}
        className="ciq-float absolute right-0 top-0 z-0 hidden sm:block [animation-delay:-2s]"
      />
      <PhoneFrame className="absolute bottom-0 left-0 z-10 w-[220px]">
        <Screen />
      </PhoneFrame>
    </div>
  );
}

/* ---------- Omnichannel: one customer, four channels ---------- */
function JourneyBoard() {
  const events = [
    { channel: "sms", text: "OTP delivered · 1.2 s", time: "09:38" },
    { channel: "rcs", text: "Rich card read · tapped Book test drive", time: "09:40" },
    { channel: "whatsapp", text: "Asked about EMI options", time: "09:41" },
    { channel: "voice", text: "Click-to-call · connected to Sales", time: "09:44" },
    { channel: "whatsapp", text: "Booking confirmation sent", time: "09:52" },
  ] as const;

  return (
    <LiveScene className="mx-auto w-full max-w-[440px] overflow-hidden rounded-2xl border border-[#e3e6ef] bg-white shadow-[0_24px_60px_-20px_rgba(5,5,8,0.4)]">
      <div className="flex items-center gap-3 border-b border-[#eceef4] px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ciq-ink)] text-[12px] font-bold text-white">
          PS
        </span>
        <div className="leading-tight">
          <p className="text-[13px] font-semibold text-[#0b0b12]">Priya Sharma</p>
          <p className="text-[11px] text-[#5b6475]">Customer ID 88213 · one timeline, every channel</p>
        </div>
        <span className="live-pop ml-auto rounded-full bg-[#e8f7ee] px-2 py-0.5 text-[10px] font-semibold text-[#0f9d58]" style={step(events.length)}>
          Converted
        </span>
      </div>
      <ol className="relative px-4 py-3">
        <span className="absolute bottom-6 left-[31px] top-6 w-px bg-[#e3e6ef]" aria-hidden />
        <span className="live-route absolute bottom-6 left-[30px] top-6 w-[3px] overflow-hidden rounded-full" aria-hidden />
        {events.map((e, i) => (
          <li key={i} className="live-card relative flex items-start gap-3 py-2" style={step(i)}>
            <ChannelLogo channel={e.channel} size="sm" className="relative z-10" />
            <div className="flex-1 leading-tight">
              <p className="text-[12px] text-[#0b0b12]">{e.text}</p>
              <p className="text-[10px] text-[#8a92a3]">{e.time}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="grid grid-cols-4 divide-x divide-[#eceef4] border-t border-[#eceef4] text-center text-[11px]">
        {(["sms", "whatsapp", "rcs", "voice"] as const).map((c) => (
          <div key={c} className="flex flex-col items-center gap-1 py-2.5">
            <ChannelLogo channel={c} size="sm" />
            <span className="text-[#5b6475] capitalize">{c === "sms" || c === "rcs" ? c.toUpperCase() : c}</span>
          </div>
        ))}
      </div>
    </LiveScene>
  );
}

/* ---------- Growth Stack: funnel from audience to conversion ---------- */
function FunnelBoard() {
  const stages = [
    { label: "Audience identified", value: "1.2M", width: "100%", channel: "audience" },
    { label: "Reached · CTV, OTT, Display", value: "640K", width: "82%", channel: "advertising" },
    { label: "Engaged · RCS, WhatsApp", value: "48.2K", width: "62%", channel: "rcs" },
    { label: "Conversed · Voice", value: "6.1K", width: "44%", channel: "voice" },
    { label: "Converted", value: "910", width: "28%", channel: "growth" },
  ] as const;

  return (
    <LiveScene className="mx-auto w-full max-w-[440px] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b12] text-white shadow-[0_24px_60px_-20px_rgba(5,5,8,0.6)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">Growth Stack</p>
          <p className="text-[13px] font-semibold">Nova EV launch · 30 days</p>
        </div>
        <span className="live-pop rounded-full bg-[var(--ciq-pink)]/15 px-2 py-0.5 text-[10px] font-semibold text-[var(--ciq-pink)]" style={step(stages.length)}>
          CAC −34%
        </span>
      </div>
      <ol className="space-y-2.5 px-4 py-4">
        {stages.map((s, i) => (
          <li key={s.label} className="flex items-center gap-3">
            <ChannelLogo channel={s.channel} size="sm" />
            <div className="flex-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white/80">{s.label}</span>
                <span className="live-pop font-semibold tabular-nums" style={step(i)}>{s.value}</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-white/10">
                <div
                  className="live-bar h-2 rounded-full bg-[linear-gradient(90deg,#2da8ff,#9b4dff,#ff2d8b)]"
                  style={{ ["--w" as string]: s.width, ...step(i) }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
      <p className="border-t border-white/10 px-4 py-2.5 text-[10px] text-white/50">
        Audience and media by Mediacorn Digital · Messaging and voice by commsIQ
      </p>
    </LiveScene>
  );
}

export function ChannelBoard({ channel }: { channel: string }) {
  const key = (["sms", "whatsapp", "rcs", "voice", "middleware", "intel"].includes(channel)
    ? channel
    : "sms") as Channel;

  if (key === "middleware") {
    return (
      <div className="flex h-full min-h-[320px] items-center">
        <JourneyBoard />
      </div>
    );
  }
  if (key === "intel") {
    return (
      <div className="flex h-full min-h-[320px] items-center">
        <FunnelBoard />
      </div>
    );
  }
  return (
    <div className="relative h-full min-h-[480px] w-full">
      <PhoneWithConsole channel={key} />
    </div>
  );
}
