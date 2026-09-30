import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds per loop. */
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  /** Fade the edges into the background. */
  fade?: boolean;
};

/** Infinite horizontal marquee. Content is duplicated once for a seamless loop. */
export function Marquee({
  children,
  className,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  fade = true,
}: Props) {
  return (
    <div
      className={cn(
        "group/marquee relative flex w-full overflow-hidden",
        fade && "[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          direction === "left" ? "animate-[ciq-marquee-left_var(--speed)_linear_infinite]" : "animate-[ciq-marquee-right_var(--speed)_linear_infinite]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{ ["--speed" as string]: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
