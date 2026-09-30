import type { CSSProperties, ReactNode } from "react";
import { IconChecks, IconHeadset, IconPhoneIncoming, IconRosetteDiscountCheck, IconUsers } from "@tabler/icons-react";
import { ChannelLogo } from "@/components/ui/ChannelLogo";
import { cn } from "@/lib/utils";

/**
 * Product windows for the channel track. Each is a real-looking slice of the
 * product, built in code and looping through a realistic sequence.
 */

const step = (i: number, cycle = 7): CSSProperties => ({ "--d": `${i * 0.9}s`, "--cycle": `${cycle}s` } as CSSProperties);

function Window({ title, channel, children, className }: { title: string; channel: Parameters<typeof ChannelLogo>[0]["channel"]; children: ReactNode; className?: string }) {
  return (
    <div className={cn("ciq-window relative w-full overflow-hidden rounded-[22px] border border-white/12 bg-[#0b0b14]/85 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl", className)}>
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <ChannelLogo channel={channel} size="sm" />
        <span className="text-[12px] font-semibold text-white/80">{title}</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#25d366]">
          <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#25d366]" /> live
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ SMS */
const SMS_ROWS = [
  { to: "+91 98•• ••312", body: "Your commsIQ OTP is 482913. Valid for 5 min.", type: "OTP", ms: "0.6s" },
  { to: "+91 90•• ••871", body: "Order #48213 out for delivery today. Track: ciq.io/t/8xk", type: "Alert", ms: "0.8s" },
  { to: "+91 99•• ••045", body: "Flat 20% off till midnight. Shop: ciq.io/s/20", type: "Promo", ms: "1.1s" },
  { to: "+91 97•• ••660", body: "EMI of ₹4,250 due 28 Sep. Pay: ciq.io/p/emi", type: "Reminder", ms: "0.7s" },
];

export function VisualSms() {
  return (
    <Window title="Message console · Sender ID CMSIQ" channel="sms">
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Throughput", "1,240 /s"],
          ["Delivered", "99.2%"],
          ["DLT", "Registered"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">{k}</p>
            <p className="mt-0.5 font-mono text-[15px] font-semibold text-white">{v}</p>
          </div>
        ))}
      </div>
      <ul className="mt-3 space-y-2">
        {SMS_ROWS.map((r, i) => (
          <li key={r.to} className="ciq-loop flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5" style={step(i)}>
            <span className="mt-0.5 rounded-md bg-[#2da8ff]/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#2da8ff]">{r.type}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] text-white/90">{r.body}</p>
              <p className="mt-0.5 font-mono text-[10px] text-white/40">{r.to}</p>
            </div>
            <span className="ciq-loop-late flex items-center gap-1 text-[10px] font-semibold text-[#25d366]" style={step(i)}>
              <IconChecks size={14} /> {r.ms}
            </span>
          </li>
        ))}
      </ul>
    </Window>
  );
}

/* ------------------------------------------------------------- WhatsApp */
export function VisualWhatsapp() {
  return (
    <Window title="Aurelia Store · Business account" channel="whatsapp">
      <div className="flex flex-col gap-2.5">
        <div className="ciq-loop self-start rounded-2xl rounded-bl-md bg-white/[0.08] px-3 py-2 text-[12px] text-white/90" style={step(0, 8)}>
          Hi! I&apos;m looking for running shoes under ₹5,000.
        </div>
        <div className="ciq-loop self-end w-[86%] overflow-hidden rounded-2xl rounded-br-md bg-[#0f2f22] text-[12px]" style={step(1, 8)}>
          <div className="grid grid-cols-3 gap-1 p-1">
            {["#ff2d8b", "#9b4dff", "#2da8ff"].map((c) => (
              <div key={c} className="h-16 rounded-lg" style={{ background: `linear-gradient(135deg, ${c}, #050508)` }} />
            ))}
          </div>
          <div className="px-3 py-2 text-white/90">
            3 picks in your budget <span className="text-white/50">· Catalog</span>
          </div>
          <div className="grid grid-cols-2 gap-1 border-t border-white/10 p-1">
            <button className="rounded-lg bg-white/[0.06] py-1.5 text-center font-semibold text-[#25d366]">View all</button>
            <button className="rounded-lg bg-white/[0.06] py-1.5 text-center font-semibold text-[#25d366]">Size guide</button>
          </div>
        </div>
        <div className="ciq-loop self-start rounded-2xl rounded-bl-md bg-white/[0.08] px-3 py-2 text-[12px] text-white/90" style={step(2, 8)}>
          Second one, size 9.
        </div>
        <div className="ciq-loop self-end rounded-2xl rounded-br-md bg-[#0f2f22] px-3 py-2 text-[12px] text-white/90" style={step(3, 8)}>
          Added to cart. Pay ₹4,499 securely:{" "}
          <span className="rounded-md bg-[#25d366] px-2 py-0.5 font-semibold text-[#052e1a]">Pay now</span>
          <span className="mt-1 flex justify-end text-[#53bdeb]">
            <IconChecks size={14} />
          </span>
        </div>
        <div className="ciq-loop flex items-center gap-1 self-start rounded-full bg-white/[0.06] px-3 py-1.5" style={step(4, 8)} aria-hidden>
          <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:0ms]" />
          <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:120ms]" />
          <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:240ms]" />
        </div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------------------ RCS */
export function VisualRcs() {
  const cards = [
    { t: "Goa · 3N/4D", p: "₹18,499", g: "linear-gradient(135deg,#2da8ff,#1a2a6e)" },
    { t: "Kerala · 4N/5D", p: "₹22,900", g: "linear-gradient(135deg,#9b4dff,#2a1560)" },
    { t: "Ladakh · 6N/7D", p: "₹34,750", g: "linear-gradient(135deg,#ff2d8b,#5a0f3a)" },
  ];
  return (
    <Window title="TripNest Holidays" channel="rcs">
      <div className="mb-3 flex items-center gap-2 text-[12px]">
        <span className="font-semibold text-white">TripNest Holidays</span>
        <IconRosetteDiscountCheck size={16} className="text-[#1a73e8]" />
        <span className="text-white/45">Verified sender</span>
      </div>
      <div className="ciq-rcs-track flex gap-3">
        {cards.map((c) => (
          <div key={c.t} className="w-[62%] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f1a]">
            <div className="h-24" style={{ background: c.g }} />
            <div className="px-3 py-2.5">
              <p className="text-[13px] font-semibold text-white">{c.t}</p>
              <p className="text-[12px] text-white/60">from {c.p} · flights incl.</p>
              <div className="mt-2 flex gap-1.5">
                <span className="rounded-full border border-[#1a73e8]/60 px-2.5 py-1 text-[11px] font-semibold text-[#8ab4f8]">Book</span>
                <span className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] font-semibold text-white/80">Itinerary</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-1.5">
        {["Change dates", "Talk to an expert", "Share"].map((s) => (
          <span key={s} className="rounded-full bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-white/85">
            {s}
          </span>
        ))}
      </div>
    </Window>
  );
}

/* ---------------------------------------------------------------- Voice */
export function VisualVoice() {
  const flow = [
    { Icon: IconPhoneIncoming, l: "Incoming", s: "+91 98•• ••312" },
    { Icon: IconUsers, l: "IVR", s: "Press 2 · Orders" },
    { Icon: IconHeadset, l: "Agent", s: "Priya · 00:42" },
  ];
  return (
    <Window title="Cloud contact centre · Queue: Orders" channel="voice">
      <div className="relative flex items-center justify-between">
        <span className="absolute left-8 right-8 top-[24px] h-px bg-white/12" aria-hidden />
        <span className="ciq-auto-pulse absolute top-[20px] h-2.5 w-2.5 rounded-full bg-[#ff2d8b] shadow-[0_0_16px_#ff2d8b]" aria-hidden />
        {flow.map((f, i) => (
          <div key={f.l} className="ciq-voice-node relative flex w-[30%] flex-col items-center text-center" style={{ animationDelay: `${i * 0.85}s` }}>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0f0f1a] text-white">
              <f.Icon size={20} />
            </span>
            <p className="mt-2 text-[11px] font-semibold text-white">{f.l}</p>
            <p className="font-mono text-[10px] text-white/50">{f.s}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-end gap-[3px] rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3" aria-hidden>
        {Array.from({ length: 42 }).map((_, i) => (
          <span key={i} className="ciq-wave-bar w-full rounded-sm bg-gradient-to-t from-[#ff2d8b] to-[#9b4dff]" style={{ height: `${10 + ((i * 37) % 26)}px`, animationDelay: `${(i % 7) * 0.09}s` }} />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3 text-center">
        {[
          ["Answer rate", "94%"],
          ["Avg wait", "18s"],
          ["Recording", "On"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">{k}</p>
            <p className="font-mono text-[15px] font-semibold text-white">{v}</p>
          </div>
        ))}
      </div>
    </Window>
  );
}

export const PRODUCT_VISUALS: Record<string, () => ReactNode> = {
  sms: VisualSms,
  whatsapp: VisualWhatsapp,
  rcs: VisualRcs,
  voice: VisualVoice,
};

