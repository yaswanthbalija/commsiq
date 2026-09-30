import { IconBolt, IconRoute, IconTargetArrow } from "@tabler/icons-react";
import { ChannelLogo, type ChannelKey } from "@/components/ui/ChannelLogo";
import { LiveScene } from "@/components/motion/LiveScene";
import { cn } from "@/lib/utils";

const step = (i: number) => ({ ["--i" as string]: i });

const ORBIT: readonly ChannelKey[] = ["sms", "whatsapp", "rcs", "voice"];

const CARDS = {
  connect: [
    { Icon: IconRoute, title: "One customer ID", body: "Every channel, one timeline" },
    { Icon: IconBolt, title: "Sub-second delivery", body: "OTP and alerts at scale" },
    { Icon: IconTargetArrow, title: "Right channel", body: "Chosen per moment" },
  ],
  engage: [
    { Icon: IconTargetArrow, title: "Right message", body: "Personalised per segment" },
    { Icon: IconRoute, title: "Right channel", body: "RCS, WhatsApp, SMS" },
    { Icon: IconBolt, title: "Right moment", body: "Triggered by behaviour" },
  ],
  convert: [
    { Icon: IconBolt, title: "Click-to-call", body: "Escalate high intent" },
    { Icon: IconRoute, title: "Journey closes", body: "Confirm, then retain" },
    { Icon: IconTargetArrow, title: "Outcome tracked", body: "Attribution built in" },
  ],
} as const;

type Props = { focus?: keyof typeof CARDS; className?: string; compact?: boolean };

/**
 * The "intelligence ring": channels orbit the commsIQ core on a spinning ring,
 * links carry running light into the core, and three cards float in 3D.
 * Pure CSS/SVG; plays when in view.
 */
export function OrbitDiagram({ focus = "engage", className, compact = false }: Props) {
  const cards = CARDS[focus];
  return (
    <LiveScene className={cn("relative mx-auto aspect-square w-full max-w-[520px] [perspective:1200px]", className)}>
      {/* rings */}
      <div className="ciq-spin-slow absolute inset-[6%] rounded-full border border-dashed border-white/20" aria-hidden />
      <div className="ciq-spin-rev absolute inset-[22%] rounded-full border border-white/10" aria-hidden />
      <div className="absolute inset-[38%] rounded-full bg-[radial-gradient(circle,rgba(255,45,139,0.45),rgba(155,77,255,0.2)_55%,transparent_75%)] blur-xl" aria-hidden />

      {/* links: SVG lines from orbit points to core with running dash */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="orbit-link" x1="0" x2="1">
            <stop offset="0" stopColor="#ff2d8b" />
            <stop offset="1" stopColor="#2da8ff" />
          </linearGradient>
        </defs>
        {ORBIT.map((_, i) => {
          const a = (i * Math.PI) / 2 - Math.PI / 4;
          const x = 50 + Math.cos(a) * 44;
          const y = 50 + Math.sin(a) * 44;
          return (
            <g key={i}>
              <line x1={x} y1={y} x2="50" y2="50" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
              <line
                x1={x}
                y1={y}
                x2="50"
                y2="50"
                stroke="url(#orbit-link)"
                strokeWidth="0.9"
                strokeLinecap="round"
                className="ciq-dash-run"
                style={{ animationDelay: `${i * -0.7}s` }}
              />
            </g>
          );
        })}
      </svg>

      {/* orbiting channel nodes (rotate the ring, counter-rotate the badge so it stays upright) */}
      <div className="ciq-spin-slow absolute inset-[6%]" aria-hidden>
        {ORBIT.map((ch, i) => {
          const a = (i * Math.PI) / 2 - Math.PI / 4;
          const x = 50 + Math.cos(a) * 50;
          const y = 50 + Math.sin(a) * 50;
          return (
            <div key={ch} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
              <div className="ciq-spin-slow-rev">
                <span className="live-pop flex items-center justify-center rounded-full bg-[#0b0b12] p-1.5 shadow-[0_10px_30px_rgba(5,5,8,0.6)] ring-1 ring-white/15" style={step(i)}>
                  <ChannelLogo channel={ch} size={compact ? "sm" : "md"} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* core */}
      <div className="absolute left-1/2 top-1/2 flex h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b0b12] shadow-[0_0_60px_rgba(255,45,139,0.45)] ring-2 ring-white/70">
        <span className="ciq-gradient-text text-xl font-extrabold tracking-tight md:text-2xl">IQ</span>
      </div>

      {/* floating 3D cards */}
      {!compact &&
        cards.map((card, i) => (
          <div
            key={card.title}
            className={cn(
              "live-card ciq-float absolute z-10 w-[38%] rounded-2xl border border-white/12 bg-[#0b0b12]/70 p-3 text-white shadow-[0_20px_50px_-16px_rgba(5,5,8,0.7)] backdrop-blur-md",
              i === 0 && "left-0 top-0 [transform:rotateY(14deg)]",
              i === 1 && "right-0 top-[6%] [transform:rotateY(-14deg)]",
              i === 2 && "bottom-0 right-[4%] [transform:rotateX(10deg)]",
            )}
            style={{ ...step(i + 3), animationDelay: `${0.5 + i * 0.2}s, ${i * -1.7}s` }}
          >
            <card.Icon size={18} className="text-[var(--ciq-pink)]" />
            <p className="mt-2 text-[13px] font-bold leading-tight">{card.title}</p>
            <p className="mt-0.5 text-[11px] text-white/60">{card.body}</p>
          </div>
        ))}
    </LiveScene>
  );
}
