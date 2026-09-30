import {
  IconBrandGoogle,
  IconBrandWhatsapp,
  IconCheck,
  IconChevronLeft,
  IconDots,
  IconMicrophone,
  IconPhoneCall,
  IconVideo,
} from "@tabler/icons-react";
import type { Scenario, ScenarioMessage } from "@/lib/content/scenarios";
import { cn } from "@/lib/utils";
import { LiveScene } from "@/components/motion/LiveScene";

const step = (i: number) => ({ ["--i" as string]: i });

const MEDIA: Record<NonNullable<Extract<ScenarioMessage, { from: "biz" }>["media"]>, string> = {
  pink: "bg-[linear-gradient(135deg,#ff2d8b,#9b4dff)]",
  blue: "bg-[linear-gradient(120deg,#2da8ff,#9b4dff)]",
  green: "bg-[linear-gradient(120deg,#25d366,#128c7e)]",
};

function StatusBar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-5 pb-1 pt-3 text-[11px] font-semibold",
        tone === "dark" ? "text-[#0b0b12]" : "text-white",
      )}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="inline-block h-2 w-3 rounded-[2px] bg-current" />
        <span className="inline-block h-2 w-4 rounded-[2px] border border-current" />
      </span>
    </div>
  );
}

/* ---------- skins ---------- */

type SkinProps = { scenario: Scenario; compact?: boolean };

function Chips({ chips, tone, i }: { chips: readonly string[]; tone: string; i: number }) {
  return (
    <div className="flex gap-1.5 overflow-hidden">
      {chips.map((chip, j) => (
        <span
          key={chip}
          className={cn("live-chip shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold", tone)}
          style={step(i + j * 0.25)}
        >
          {chip}
        </span>
      ))}
    </div>
  );
}

function SmsSkin({ scenario, compact }: SkinProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      {!compact ? (
        <>
          <StatusBar />
          <div className="flex items-center gap-2 border-b border-black/5 px-3 pb-2">
            <IconChevronLeft size={18} className="text-[#007aff]" />
            <div className="mx-auto text-center">
              <div className="mx-auto mb-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#8e8e93] text-[10px] font-bold text-white">
                {scenario.business.slice(0, 2)}
              </div>
              <p className="text-[11px] font-semibold text-[#0b0b12]">{scenario.business}</p>
            </div>
            <span className="w-[18px]" />
          </div>
        </>
      ) : null}
      <div className="flex min-h-0 flex-1 flex-col justify-end space-y-2 overflow-hidden px-3 pt-3 text-[12px] leading-[1.35]">
        {!compact ? <p className="text-center text-[10px] text-[#8e8e93]">Text Message · {scenario.time}</p> : null}
        {scenario.messages.map((m, i) =>
          m.from === "biz" ? (
            <div key={i} className="live-msg max-w-[88%] rounded-[16px] rounded-bl-[4px] bg-[#e9e9eb] px-3 py-2 text-[#0b0b12]" style={step(i)}>
              {m.text}
            </div>
          ) : (
            <div key={i} className="live-msg live-msg--right ml-auto max-w-[70%] rounded-[16px] rounded-br-[4px] bg-[#34c759] px-3 py-2 text-white" style={step(i)}>
              {m.text}
            </div>
          ),
        )}
        <p className="live-fade text-right text-[10px] text-[#8e8e93]" style={step(scenario.messages.length)}>
          Delivered
        </p>
      </div>
      {!compact ? (
        <div className="flex items-center gap-2 px-3 pb-4 pt-2">
          <span className="h-7 w-7 rounded-full bg-[#e9e9eb]" />
          <span className="flex-1 rounded-full border border-black/10 px-3 py-1.5 text-[11px] text-[#8e8e93]">Text Message</span>
        </div>
      ) : null}
    </div>
  );
}

function WhatsappSkin({ scenario, compact }: SkinProps) {
  return (
    <div className="flex h-full flex-col bg-[#efe7dd]">
      {!compact ? (
        <div className="bg-[#075e54]">
          <StatusBar tone="light" />
          <div className="flex items-center gap-2 px-3 pb-2.5 text-white">
            <IconChevronLeft size={18} />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#075e54]">
              <IconBrandWhatsapp size={18} />
            </span>
            <div className="flex-1 leading-tight">
              <p className="flex items-center gap-1 text-[12px] font-semibold">
                {scenario.business}
                <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-[#25d366]">
                  <IconCheck size={8} stroke={3} />
                </span>
              </p>
              <p className="text-[10px] text-white/80">{scenario.subtitle}</p>
            </div>
            <IconVideo size={16} />
            <IconPhoneCall size={16} />
          </div>
        </div>
      ) : null}
      <div className="flex min-h-0 flex-1 flex-col justify-end space-y-2 overflow-hidden px-3 pt-3 text-[12px] leading-[1.35]">
        {scenario.messages.map((m, i) =>
          m.from === "biz" ? (
            <div key={i} className="space-y-1.5">
              <div className="live-msg max-w-[90%] rounded-lg rounded-tl-none bg-white px-2.5 py-2 text-[#111] shadow-sm" style={step(i)}>
                {m.media && !compact ? <div className={cn("mb-1.5 h-[60px] rounded-md", MEDIA[m.media])} /> : null}
                {m.title ? <p className="font-semibold">{m.title}</p> : null}
                {m.text}
                <p className="mt-1 text-right text-[9px] text-[#667781]">{scenario.time}</p>
              </div>
              {m.chips ? (
                <div className="live-msg max-w-[90%] overflow-hidden rounded-lg bg-white text-[#027eb5] shadow-sm" style={step(i + 0.3)}>
                  {m.chips.map((chip, j) => (
                    <p key={chip} className={cn("px-2 py-1.5 text-center text-[11px] font-semibold", j > 0 && "border-t border-black/5")}>
                      {chip}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div key={i} className="live-msg live-msg--right ml-auto max-w-[78%] rounded-lg rounded-tr-none bg-[#d9fdd3] px-2.5 py-2 text-[#111] shadow-sm" style={step(i)}>
              {m.text}
              <p className="mt-1 text-right text-[9px] text-[#667781]">
                {scenario.time} <span className="live-tick" style={step(i)}>✓✓</span>
              </p>
            </div>
          ),
        )}
      </div>
      {!compact ? (
        <div className="flex items-center gap-2 px-3 pb-4 pt-2">
          <span className="flex-1 rounded-full bg-white px-3 py-1.5 text-[11px] text-[#8e8e93]">Message</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00a884] text-white">
            <IconMicrophone size={15} />
          </span>
        </div>
      ) : null}
    </div>
  );
}

function RcsSkin({ scenario, compact }: SkinProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      {!compact ? (
        <>
          <StatusBar />
          <div className="flex items-center gap-2 px-3 pb-2">
            <IconChevronLeft size={18} className="text-[#3c4043]" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a73e8] text-white">
              <IconBrandGoogle size={15} />
            </span>
            <div className="flex-1 leading-tight">
              <p className="flex items-center gap-1 text-[12px] font-semibold text-[#202124]">
                {scenario.business}
                <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-[#1a73e8] text-white">
                  <IconCheck size={8} stroke={3} />
                </span>
              </p>
              <p className="text-[10px] text-[#5f6368]">{scenario.subtitle}</p>
            </div>
            <IconDots size={16} className="text-[#3c4043]" />
          </div>
        </>
      ) : null}
      <div className="flex min-h-0 flex-1 flex-col justify-end space-y-2 overflow-hidden px-3 pt-2 text-[12px] leading-[1.35]">
        {scenario.messages.map((m, i) =>
          m.from === "biz" ? (
            <div key={i} className="space-y-1.5">
              <div className="live-msg max-w-[92%] overflow-hidden rounded-2xl rounded-tl-md bg-[#f1f3f4]" style={step(i)}>
                {m.media && !compact ? <div className={cn("h-[72px]", MEDIA[m.media])} /> : null}
                <div className="px-3 py-2 text-[#202124]">
                  {m.title ? <p className="font-semibold">{m.title}</p> : null}
                  <p className={cn(m.title && "mt-0.5 text-[11px] text-[#5f6368]")}>{m.text}</p>
                </div>
              </div>
              {m.chips ? <Chips chips={m.chips} tone="border-[#1a73e8]/40 text-[#1a73e8]" i={i} /> : null}
            </div>
          ) : (
            <div key={i} className="live-msg live-msg--right ml-auto max-w-[70%] rounded-2xl rounded-tr-md bg-[#1a73e8] px-3 py-2 text-white" style={step(i)}>
              {m.text}
            </div>
          ),
        )}
      </div>
      {!compact ? (
        <div className="px-3 pb-4 pt-2">
          <span className="block rounded-full bg-[#f1f3f4] px-3 py-1.5 text-[11px] text-[#5f6368]">RCS message</span>
        </div>
      ) : null}
    </div>
  );
}

const SKINS = { sms: SmsSkin, whatsapp: WhatsappSkin, rcs: RcsSkin } as const;

/** Full phone screen for a scenario; drop inside `PhoneFrame`. */
export function ScenarioScreen({ scenario }: { scenario: Scenario }) {
  const Skin = SKINS[scenario.skin];
  return <Skin scenario={scenario} />;
}

/**
 * Compact chat preview (first few messages, no phone chrome) for cards.
 * Wraps itself in a LiveScene so messages arrive when the card scrolls in.
 */
export function ScenarioPeek({ scenario, className, limit = 2 }: { scenario: Scenario; className?: string; limit?: number }) {
  const Skin = SKINS[scenario.skin];
  const trimmed: Scenario = { ...scenario, messages: scenario.messages.slice(0, limit) };
  return (
    <LiveScene className={cn("overflow-hidden rounded-2xl border border-[var(--ciq-ink)]/8 shadow-[0_14px_36px_-18px_rgba(9,17,43,0.35)]", className)}>
      <div className="pb-3 text-[11px]">
        <Skin scenario={trimmed} compact />
      </div>
    </LiveScene>
  );
}
