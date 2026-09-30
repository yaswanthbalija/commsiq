"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type StickyScrollItem = {
  title: string;
  description: string;
  href?: string;
  content?: React.ReactNode;
};

type Props = {
  content: StickyScrollItem[];
  contentClassName?: string;
};

/**
 * Sticky scroll reveal — active card from scroll position with hysteresis.
 * No custom cursor / glow chase.
 */
export function StickyScroll({ content, contentClassName }: Props) {
  const [activeCard, setActiveCard] = useState(0);
  const activeRef = useRef(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    activeRef.current = activeCard;
  }, [activeCard]);

  useEffect(() => {
    let ticking = false;

    function pickActive() {
      ticking = false;
      const nodes = itemRefs.current;
      if (!nodes.length) return;

      const viewportMid = window.innerHeight * 0.42;
      let bestIdx = activeRef.current;
      let bestDist = Number.POSITIVE_INFINITY;

      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height * 0.35;
        const dist = Math.abs(mid - viewportMid);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }

      if (bestIdx === activeRef.current) return;
      const current = nodes[activeRef.current];
      if (current) {
        const rect = current.getBoundingClientRect();
        const currentDist = Math.abs(rect.top + rect.height * 0.35 - viewportMid);
        if (currentDist - bestDist < 48) return;
      }

      activeRef.current = bestIdx;
      setActiveCard(bestIdx);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(pickActive);
    }

    pickActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [content.length]);

  return (
    <div className="relative">
      <div className="relative flex w-full items-start gap-8 lg:gap-14">
        <div className="relative w-full max-w-lg shrink-0 lg:max-w-xl">
          {content.map((item, index) => {
            const isActive = activeCard === index;
            return (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="min-h-[58vh] py-10 md:min-h-[52vh] md:py-14"
              >
                <div className="relative mb-6 min-h-[460px] overflow-visible lg:hidden">
                  {item.content}
                </div>
                <h3
                  className={cn(
                    "text-2xl font-bold tracking-tight text-[var(--ciq-ink)] transition-opacity duration-300 md:text-[2rem]",
                    isActive ? "opacity-100" : "opacity-35",
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-5 max-w-md text-base leading-7 text-[var(--ciq-ink)]/70 transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-35",
                  )}
                >
                  {item.description}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className={cn(
                      "mt-5 inline-flex text-sm font-semibold text-[var(--ciq-pink)] transition hover:text-[var(--ciq-blue)]",
                      isActive ? "opacity-100" : "opacity-35",
                    )}
                  >
                    Explore {item.title}
                  </a>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="sticky top-28 hidden w-full max-w-[34rem] shrink-0 self-start lg:block xl:max-w-[38rem]">
          <div
            className={cn(
              "relative h-[520px] w-full overflow-visible",
              contentClassName,
            )}
          >
            {content.map((item, index) => {
              const isActive = activeCard === index;
              return (
                <div
                  key={item.title}
                  className="absolute inset-0 transition-opacity duration-700 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    zIndex: isActive ? 2 : 1,
                    visibility:
                      isActive || Math.abs(activeCard - index) <= 1
                        ? "visible"
                        : "hidden",
                  }}
                  aria-hidden={!isActive}
                >
                  {item.content ?? null}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between px-1">
            <p className="text-xs font-semibold tracking-[0.16em] text-[var(--ciq-ink)]/40 uppercase">
              {String(activeCard + 1).padStart(2, "0")} /{" "}
              {String(content.length).padStart(2, "0")}
            </p>
            <div className="flex gap-1.5">
              {content.map((item, i) => (
                <span
                  key={item.title}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === activeCard
                      ? "w-6 bg-[var(--ciq-pink)]"
                      : "w-1.5 bg-[var(--ciq-ink)]/20",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
