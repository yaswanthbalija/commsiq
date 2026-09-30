import { cn } from "@/lib/utils";

const ARROW = /\s*(?:→|->)\s*/;

/** Split "A → B → C" into ["A", "B", "C"]. Returns [] when no arrow present. */
export function splitFlow(text: string): string[] {
  if (!/→|->/.test(text)) return [];
  return text
    .split(ARROW)
    .map((s) => s.trim())
    .filter(Boolean);
}

type StepsProps = {
  steps: readonly string[];
  activeIndex?: number;
  tone?: "light" | "dark";
  size?: "sm" | "md";
};

/** Connected steps rendered as chips joined by a rule. No arrow glyphs. */
export function FlowSteps({ steps, activeIndex, tone = "light", size = "md" }: StepsProps) {
  const dark = tone === "dark";
  return (
    <ol className="flex flex-wrap items-center gap-y-3">
      {steps.map((step, i) => {
        const active = activeIndex === i;
        return (
          <li key={`${step}-${i}`} className="flex items-center">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border font-semibold",
                size === "sm" ? "px-3 py-1 text-xs" : "px-3.5 py-1.5 text-sm",
                dark
                  ? active
                    ? "border-[var(--ciq-pink)] bg-[var(--ciq-pink)] text-white"
                    : "border-white/20 bg-white/5 text-white/85"
                  : active
                    ? "border-[var(--ciq-ink)] bg-[var(--ciq-ink)] text-white"
                    : "border-[var(--ciq-ink)]/12 bg-white text-[var(--ciq-ink)]",
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-bold tabular-nums",
                  active ? "opacity-80" : dark ? "text-[var(--ciq-blue)]" : "text-[var(--ciq-pink)]",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </span>
            {i < steps.length - 1 ? (
              <span
                aria-hidden
                className={cn("mx-1.5 h-px w-5 shrink-0", dark ? "bg-white/25" : "bg-[var(--ciq-ink)]/20")}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

type FlowTextProps = {
  text: string;
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Render body copy that may contain an arrow flow.
 * "Lead: A → B → C." becomes the lead sentence plus FlowSteps.
 */
export function FlowText({ text, tone = "light", className }: FlowTextProps) {
  if (!/→|->/.test(text)) return <p className={className}>{text}</p>;

  const colon = text.indexOf(":");
  const hasLead = colon > -1 && /→|->/.test(text.slice(colon));
  const lead = hasLead ? text.slice(0, colon + 1) : "";
  const rest = (hasLead ? text.slice(colon + 1) : text).trim();

  // Trailing sentence after the flow, e.g. "... → confirmation. One customer. One journey."
  const firstStop = rest.indexOf(". ");
  const flowPart = firstStop > -1 ? rest.slice(0, firstStop) : rest.replace(/\.$/, "");
  const tail = firstStop > -1 ? rest.slice(firstStop + 2) : "";

  return (
    <div className={cn("space-y-3", className)}>
      {lead ? <p>{lead}</p> : null}
      <FlowSteps steps={splitFlow(flowPart)} tone={tone} size="sm" />
      {tail ? <p>{tail}</p> : null}
    </div>
  );
}
