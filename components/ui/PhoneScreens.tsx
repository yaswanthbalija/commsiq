import type { ReactNode } from "react";
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
import { cn } from "@/lib/utils";
import { LiveScene } from "@/components/motion/LiveScene";

/**
 * Hand-built phone screens for each channel.
 * Each scene reproduces the real inbox UI (iOS Messages, WhatsApp, Android RCS,
 * a phone call screen) so the product visuals match what customers actually see.
 * Messages arrive in sequence when the phone scrolls into view (see .live-* in globals.css).
 */

/** CSS custom property used by the live-scene stagger. */
const step = (i: number) => ({ ["--i" as string]: i });

export function PhoneFrame({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <LiveScene
      className={cn(
        "relative aspect-[9/19] w-[250px] overflow-hidden rounded-[38px] border-[6px] shadow-[0_30px_70px_-20px_rgba(5,5,8,0.55)]",
        dark ? "border-[#1a1a22] bg-[#0b0b12]" : "border-[#111118] bg-white",
        className,
      )}
    >
      <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-[#0b0b12]" />
      <div className="h-full w-full">{children}</div>
    </LiveScene>
  );
}

function Typing({ className, i }: { className?: string; i: number }) {
  return (
    <span
      className={cn("live-typing live-typing--hide inline-flex items-center gap-1 rounded-[16px] px-3 py-2", className)}
      style={step(i)}
      aria-hidden
    >
      <span />
      <span />
      <span />
    </span>
  );
}

function StatusBar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "dark" ? "text-[#0b0b12]" : "text-white";
  return (
    <div className={cn("flex items-center justify-between px-5 pb-1 pt-3 text-[11px] font-semibold", color)}>
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="inline-block h-2 w-3 rounded-[2px] bg-current" />
        <span className="inline-block h-2 w-4 rounded-[2px] border border-current" />
      </span>
    </div>
  );
}

/* ---------- SMS (iOS Messages) ---------- */
export function SmsScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex items-center gap-2 border-b border-black/5 px-3 pb-2">
        <IconChevronLeft size={18} className="text-[#007aff]" />
        <div className="mx-auto text-center">
          <div className="mx-auto mb-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#8e8e93] text-[11px] font-bold text-white">
            CQ
          </div>
          <p className="text-[11px] font-semibold text-[#0b0b12]">COMMSQ</p>
        </div>
        <span className="w-[18px]" />
      </div>
      <div className="flex-1 space-y-2 px-3 pt-3 text-[12px] leading-[1.35]">
        <p className="text-center text-[10px] text-[#8e8e93]">Text Message · Today 9:38</p>
        <div className="live-msg max-w-[86%] rounded-[16px] rounded-bl-[4px] bg-[#e9e9eb] px-3 py-2 text-[#0b0b12]" style={step(0)}>
          <b className="tracking-[0.08em]">482913</b> is your one-time password for commsIQ. Valid for 10 minutes. Do not share it.
        </div>
        <div className="live-msg max-w-[86%] rounded-[16px] rounded-bl-[4px] bg-[#e9e9eb] px-3 py-2 text-[#0b0b12]" style={step(1)}>
          Your payment of ₹4,250 to Acme Retail is confirmed. Ref 88213A.
        </div>
        <div className="live-msg max-w-[86%] rounded-[16px] rounded-bl-[4px] bg-[#e9e9eb] px-3 py-2 text-[#0b0b12]" style={step(2)}>
          Order #A1029 is out for delivery. Track: cq.link/a1029
        </div>
        <div className="live-msg live-msg--right ml-auto max-w-[70%] rounded-[16px] rounded-br-[4px] bg-[#34c759] px-3 py-2 text-white" style={step(3)}>
          STOP
        </div>
        <p className="live-fade text-right text-[10px] text-[#8e8e93]" style={step(4)}>Delivered</p>
      </div>
      <div className="flex items-center gap-2 px-3 pb-4 pt-2">
        <span className="h-7 w-7 rounded-full bg-[#e9e9eb]" />
        <span className="flex-1 rounded-full border border-black/10 px-3 py-1.5 text-[11px] text-[#8e8e93]">
          Text Message
        </span>
      </div>
    </div>
  );
}

/* ---------- WhatsApp Business ---------- */
export function WhatsappScreen() {
  return (
    <div className="flex h-full flex-col bg-[#efe7dd]">
      <div className="bg-[#075e54]">
        <StatusBar tone="light" />
        <div className="flex items-center gap-2 px-3 pb-2.5 text-white">
          <IconChevronLeft size={18} />
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#075e54]">
            <IconBrandWhatsapp size={18} />
          </span>
          <div className="flex-1 leading-tight">
            <p className="flex items-center gap-1 text-[12px] font-semibold">
              Acme Retail
              <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-[#25d366]">
                <IconCheck size={8} stroke={3} />
              </span>
            </p>
            <p className="text-[10px] text-white/80">Business account</p>
          </div>
          <IconVideo size={16} />
          <IconPhoneCall size={16} />
        </div>
      </div>
      <div className="flex-1 space-y-2 px-3 pt-3 text-[12px] leading-[1.35]">
        <div className="live-msg max-w-[90%] rounded-lg rounded-tl-none bg-white px-2.5 py-2 text-[#111] shadow-sm" style={step(0)}>
          <div className="mb-1.5 h-[68px] rounded-md bg-[linear-gradient(135deg,#ff2d8b,#9b4dff)]" />
          Hi Priya, your order <b>#A1029</b> has shipped and arrives tomorrow.
          <p className="mt-1 text-right text-[9px] text-[#667781]">
            9:40 <span className="live-tick" style={step(0)}>✓✓</span>
          </p>
        </div>
        <div className="live-msg max-w-[90%] overflow-hidden rounded-lg bg-white text-[#027eb5] shadow-sm" style={step(1)}>
          <p className="border-b border-black/5 px-2 py-1.5 text-center text-[11px] font-semibold">Track order</p>
          <p className="px-2 py-1.5 text-center text-[11px] font-semibold">Talk to support</p>
        </div>
        <div className="live-msg live-msg--right ml-auto max-w-[75%] rounded-lg rounded-tr-none bg-[#d9fdd3] px-2.5 py-2 text-[#111] shadow-sm" style={step(2)}>
          Can I change the delivery address?
          <p className="mt-1 text-right text-[9px] text-[#667781]">
            9:41 <span className="live-tick" style={step(2)}>✓✓</span>
          </p>
        </div>
        <Typing className="bg-white text-[#667781] shadow-sm" i={3} />
        <div className="live-msg max-w-[90%] rounded-lg rounded-tl-none bg-white px-2.5 py-2 text-[#111] shadow-sm" style={step(3)}>
          Yes. Share the new address and we will update it before dispatch.
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 pb-4 pt-2">
        <span className="flex-1 rounded-full bg-white px-3 py-1.5 text-[11px] text-[#8e8e93]">Message</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00a884] text-white">
          <IconMicrophone size={15} />
        </span>
      </div>
    </div>
  );
}

/* ---------- RCS (Android Messages) ---------- */
export function RcsScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex items-center gap-2 px-3 pb-2">
        <IconChevronLeft size={18} className="text-[#3c4043]" />
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a73e8] text-white">
          <IconBrandGoogle size={15} />
        </span>
        <div className="flex-1 leading-tight">
          <p className="flex items-center gap-1 text-[12px] font-semibold text-[#202124]">
            Nova Motors
            <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-[#1a73e8] text-white">
              <IconCheck size={8} stroke={3} />
            </span>
          </p>
          <p className="text-[10px] text-[#5f6368]">Verified business · RCS chat</p>
        </div>
        <IconDots size={16} className="text-[#3c4043]" />
      </div>
      <div className="flex-1 space-y-2 px-3 pt-2 text-[12px] leading-[1.35]">
        <div className="live-msg max-w-[92%] overflow-hidden rounded-2xl rounded-tl-md bg-[#f1f3f4]" style={step(0)}>
          <div className="h-[88px] bg-[linear-gradient(120deg,#1a73e8,#174ea6)]" />
          <div className="px-3 py-2 text-[#202124]">
            <p className="font-semibold">Nova EV · Book a test drive</p>
            <p className="mt-0.5 text-[11px] text-[#5f6368]">480 km range · Fast charge · From ₹14.9L</p>
          </div>
        </div>
        <div className="flex gap-1.5 overflow-hidden">
          {["Book test drive", "Call showroom", "View offers"].map((chip, i) => (
            <span
              key={chip}
              className="live-chip shrink-0 rounded-full border border-[#1a73e8]/40 px-2.5 py-1 text-[10px] font-semibold text-[#1a73e8]"
              style={step(i)}
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="live-msg live-msg--right ml-auto max-w-[70%] rounded-2xl rounded-tr-md bg-[#1a73e8] px-3 py-2 text-white" style={step(2)}>
          Book test drive
        </div>
        <div className="live-msg max-w-[92%] rounded-2xl rounded-tl-md bg-[#f1f3f4] px-3 py-2 text-[#202124]" style={step(3)}>
          Pick a slot at Nova Koramangala:
          <div className="mt-1.5 grid grid-cols-2 gap-1.5 text-[10px] font-semibold text-[#1a73e8]">
            <span className="rounded-md border border-[#1a73e8]/30 px-2 py-1 text-center">Sat 11:00</span>
            <span className="rounded-md border border-[#1a73e8]/30 px-2 py-1 text-center">Sat 16:30</span>
          </div>
        </div>
      </div>
      <div className="px-3 pb-4 pt-2">
        <span className="block rounded-full bg-[#f1f3f4] px-3 py-1.5 text-[11px] text-[#5f6368]">RCS message</span>
      </div>
    </div>
  );
}

/* ---------- Voice (call screen with IVR) ---------- */
export function VoiceScreen() {
  return (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,#0b0b12_0%,#07112b_100%)] text-white">
      <StatusBar tone="light" />
      <div className="mt-4 text-center">
        <div className="live-ring relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl font-bold text-[var(--ciq-blue)]">
          <span className="text-white">CQ</span>
        </div>
        <p className="mt-3 text-[15px] font-semibold">commsIQ Support</p>
        <p className="text-[11px] text-white/60">
          Verified business · <span className="live-dot text-[#34c759]">●</span> 02:14
        </p>
      </div>
      <div className="mx-4 mt-4 flex-1 rounded-2xl bg-white/[0.06] p-3 text-[11px] leading-[1.4]">
        <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">IVR</p>
        <p className="live-fade mt-1 text-white/85" style={step(0)}>
          Press 1 for order status. Press 2 to speak with an agent.
        </p>
        <div className="mt-2 flex gap-1.5">
          <span className="live-chip rounded-md bg-white/10 px-2 py-1 font-semibold" style={step(0)}>1</span>
          <span className="live-chip rounded-md bg-[var(--ciq-pink)] px-2 py-1 font-semibold" style={step(1)}>2</span>
        </div>
        <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-white/45">Routing</p>
        <p className="live-fade mt-1 text-white/85" style={step(1)}>
          Connecting to Sales · Bengaluru · Agent Rohan
        </p>
        <div className="live-wave mt-2 flex h-[22px] items-end gap-1.5">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-[var(--ciq-blue)]"
              style={{ height: `${6 + ((i * 7) % 16)}px`, opacity: 0.55 + ((i % 3) * 0.15), ...step(i) }}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 px-6 pb-6 pt-4 text-[10px] text-white/70">
        <div className="text-center">
          <span className="mx-auto mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
            <IconMicrophone size={18} />
          </span>
          mute
        </div>
        <div className="text-center">
          <span className="mx-auto mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-[#ff3b30] text-white">
            <IconPhoneCall size={18} />
          </span>
          end
        </div>
        <div className="text-center">
          <span className="mx-auto mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[13px] font-bold">
            #
          </span>
          keypad
        </div>
      </div>
    </div>
  );
}

export const phoneScreens = {
  sms: SmsScreen,
  whatsapp: WhatsappScreen,
  rcs: RcsScreen,
  voice: VoiceScreen,
} as const;

export type PhoneChannel = keyof typeof phoneScreens;
