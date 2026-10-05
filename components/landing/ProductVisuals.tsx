"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
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
    <div className={cn("ciq-window relative w-full overflow-hidden rounded-[22px] border border-white/12 bg-[#0b0b14]/95 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]", className)}>
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
            <span className="mt-0.5 rounded-md bg-[#ff2d8b]/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#ff7ab8]">{r.type}</span>
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
type RcsLine =
  | { kind: "card"; title: string; body: string; actions: string[] }
  | { kind: "in"; text: string }
  | { kind: "out"; text: string }
  | { kind: "chips"; items: string[] };

const RCS_THREAD: RcsLine[] = [
  {
    kind: "card",
    title: "6E 214 · DEL → BLR",
    body: "Boarding 07:40 · Gate 14 · Seat 12A · Terminal 1",
    actions: ["Boarding pass", "Change seat"],
  },
  { kind: "chips", items: ["On my way", "Need assistance"] },
  { kind: "out", text: "On my way" },
  { kind: "in", text: "We will ping you when boarding starts. Show the QR at Gate 14." },
  { kind: "in", text: "Need a cab after landing? Tap below to book." },
  { kind: "chips", items: ["Book cab", "Not now"] },
];

const RCS_TYPING_MS = 900;
const RCS_READ_MS = 2000;
const RCS_HOLD_MS = 2600;
const RCS_FADE_MS = 500;

/**
 * Paces the thread like a real chat: a typing indicator before each business
 * message, a read pause after each, then the whole thread fades out and starts
 * over instead of snapping back to the first line.
 */
function useRcsThread(total: number) {
  const [shown, setShown] = useState(1);
  const [typing, setTyping] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let timer = 0;
    const schedule = (fn: () => void, ms: number) => {
      timer = window.setTimeout(fn, ms);
    };
    const next = (n: number) => {
      if (n >= total) {
        schedule(() => {
          setFading(true);
          schedule(() => {
            setShown(1);
            setFading(false);
            schedule(() => next(1), RCS_READ_MS);
          }, RCS_FADE_MS);
        }, RCS_HOLD_MS);
        return;
      }
      const incoming = RCS_THREAD[n].kind !== "out";
      if (incoming) {
        setTyping(true);
        schedule(() => {
          setTyping(false);
          setShown(n + 1);
          schedule(() => next(n + 1), RCS_READ_MS);
        }, RCS_TYPING_MS);
      } else {
        schedule(() => {
          setShown(n + 1);
          schedule(() => next(n + 1), RCS_READ_MS * 0.6);
        }, RCS_READ_MS * 0.5);
      }
    };
    schedule(() => next(1), RCS_READ_MS);
    return () => window.clearTimeout(timer);
  }, [total]);

  return { shown, typing, fading };
}

export function VisualRcs() {
  const { shown, typing, fading } = useRcsThread(RCS_THREAD.length);

  return (
    <Window title="Google Messages · RCS" channel="rcs">
      <div className="mb-3 flex items-center gap-2 text-[12px]">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a73e8] text-[11px] font-bold text-white">6E</span>
        <div className="min-w-0">
          <p className="flex items-center gap-1 font-semibold text-white">
            IndiGo
            <IconRosetteDiscountCheck size={14} className="text-[#1a73e8]" />
          </p>
          <p className="text-[11px] text-white/45">Verified business · RCS chat</p>
        </div>
      </div>

      <div
        className="flex h-[300px] flex-col justify-end gap-2 overflow-hidden transition-opacity ease-out"
        style={{ opacity: fading ? 0 : 1, transitionDuration: `${RCS_FADE_MS}ms` }}
      >
        {RCS_THREAD.slice(0, shown).map((line, i) => {
          if (line.kind === "card") {
            return (
              <div key={i} className="ciq-rcs-in overflow-hidden rounded-2xl rounded-tl-md bg-[#202124]">
                <div className="h-[72px] bg-[linear-gradient(120deg,#1a73e8,#174ea6)]" />
                <div className="px-3 py-2.5">
                  <p className="text-[13px] font-semibold text-white">{line.title}</p>
                  <p className="mt-0.5 text-[12px] text-[#9aa0a6]">{line.body}</p>
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {line.actions.map((a) => (
                      <span key={a} className="rounded-lg border border-[#8ab4f8]/40 py-1.5 text-center text-[11px] font-semibold text-[#8ab4f8]">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          }
          if (line.kind === "chips") {
            return (
              <div key={i} className="ciq-rcs-in flex flex-wrap gap-1.5">
                {line.items.map((c) => (
                  <span key={c} className="rounded-full border border-[#8ab4f8]/50 px-3 py-1 text-[11px] font-semibold text-[#8ab4f8]">
                    {c}
                  </span>
                ))}
              </div>
            );
          }
          if (line.kind === "out") {
            return (
              <div key={i} className="ciq-rcs-in ml-auto max-w-[78%] rounded-2xl rounded-tr-md bg-[#1a73e8] px-3 py-2 text-[12px] text-white">
                {line.text}
              </div>
            );
          }
          return (
            <div key={i} className="ciq-rcs-in max-w-[88%] rounded-2xl rounded-tl-md bg-[#3c4043] px-3 py-2 text-[12px] text-[#e8eaed]">
              {line.text}
            </div>
          );
        })}
        {typing ? (
          <div className="ciq-rcs-in flex w-fit items-center gap-1 rounded-2xl rounded-tl-md bg-[#3c4043] px-3 py-2.5" aria-label="IndiGo is typing">
            {[0, 1, 2].map((d) => (
              <i key={d} className="ciq-typing-dot h-1.5 w-1.5 rounded-full bg-[#e8eaed]/80" style={{ animationDelay: `${d * 0.16}s` }} />
            ))}
          </div>
        ) : null}
      </div>
    </Window>
  );
}

/* ---------------------------------------------------------------- Voice */
export function VisualVoice() {
  const [sec, setSec] = useState(42);

  useEffect(() => {
    const id = window.setInterval(() => setSec((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const clock = `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

  return (
    <Window title="Cloud contact centre · Queue: Orders" channel="voice">
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Live call</p>
          <p className="mt-1 text-[15px] font-semibold text-white">+91 98•• ••312 → Agent Priya</p>
        </div>
        <p className="font-mono text-[18px] font-semibold tabular-nums text-[#2da8ff]">{clock}</p>
      </div>

      <ol className="mt-4 space-y-2">
        {[
          { Icon: IconPhoneIncoming, l: "Incoming answered", s: "00:00" },
          { Icon: IconUsers, l: "IVR · Press 2 Orders", s: "00:08" },
          { Icon: IconHeadset, l: "Routed to Priya · Bengaluru", s: "00:18" },
        ].map((row) => (
          <li key={row.l} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-white">
              <row.Icon size={18} />
            </span>
            <span className="flex-1 text-[13px] text-white/85">{row.l}</span>
            <span className="font-mono text-[11px] text-white/40">{row.s}</span>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex items-end gap-[3px] rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3" aria-hidden>
        {Array.from({ length: 36 }).map((_, i) => (
          <span
            key={i}
            className="ciq-call-bar w-full rounded-sm bg-[#2da8ff]"
            style={{ height: `${8 + ((i * 17) % 22)}px`, animationDelay: `${(i % 8) * 0.08}s` }}
          />
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

