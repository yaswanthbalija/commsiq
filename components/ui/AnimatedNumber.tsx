"use client";

import { useEffect, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  className?: string;
  /** When true, run the count-up */
  start?: boolean;
  /** Stagger delay in ms */
  delayMs?: number;
  /** Count duration in ms */
  durationMs?: number;
};

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function formatNumber(
  input: number,
  decimals: number,
  prefix: string,
  suffix: string,
  locale: string,
) {
  return `${prefix}${new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(input)}${suffix}`;
}

/**
 * Aceternity-style number ticker — plain rAF, no Motion reduced-motion kill switch.
 */
export function AnimatedNumber({
  value,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = "en-US",
  className,
  start = false,
  delayMs = 0,
  durationMs = 1800,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(() =>
    formatNumber(from, decimals, prefix, suffix, locale),
  );

  useEffect(() => {
    // Reset happens inside the delayed frame so no state is written synchronously in the effect.
    if (!start) {
      const resetRaf = window.requestAnimationFrame(() =>
        setDisplay(formatNumber(from, decimals, prefix, suffix, locale)),
      );
      return () => window.cancelAnimationFrame(resetRaf);
    }

    let raf = 0;
    let delayTimer = 0;
    let startTs = 0;
    let cancelled = false;

    delayTimer = window.setTimeout(() => {
      setDisplay(formatNumber(from, decimals, prefix, suffix, locale));
      const tick = (now: number) => {
        if (cancelled) return;
        if (!startTs) startTs = now;
        const t = Math.min(1, (now - startTs) / durationMs);
        const current = from + (value - from) * easeOutCubic(t);
        setDisplay(formatNumber(current, decimals, prefix, suffix, locale));
        if (t < 1) {
          raf = window.requestAnimationFrame(tick);
        } else {
          setDisplay(formatNumber(value, decimals, prefix, suffix, locale));
        }
      };
      raf = window.requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
      window.cancelAnimationFrame(raf);
    };
  }, [
    start,
    value,
    from,
    decimals,
    prefix,
    suffix,
    locale,
    delayMs,
    durationMs,
  ]);

  return (
    <span className={`inline-flex tabular-nums ${className ?? ""}`}>
      <span data-ticker aria-hidden>
        {display}
      </span>
      <span className="sr-only">
        {formatNumber(value, decimals, prefix, suffix, locale)}
      </span>
    </span>
  );
}
