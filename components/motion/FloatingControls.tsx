"use client";

import { useEffect, useState } from "react";
import { IconMessageCircle } from "@tabler/icons-react";
import { useDemoModal } from "@/components/layout/DemoModal";
import { cn } from "@/lib/utils";

const RING = 2 * Math.PI * 20;

/** Floating "talk to us" bubble and a scroll progress ring that returns to top. */
export function FloatingControls() {
  const { openDemo } = useDemoModal();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      setProgress(p);
      setVisible(window.scrollY > 400);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Reading progress along the very top edge */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[linear-gradient(90deg,#ff2d8b,#9b4dff,#2da8ff)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 md:bottom-7 md:right-7">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={cn(
          "pointer-events-auto relative flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ciq-ink)] shadow-[0_10px_30px_rgba(5,5,8,0.18)] backdrop-blur transition-all duration-500",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden>
          <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(11,11,18,0.08)" strokeWidth="2.5" />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="url(#ciq-ring)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={RING}
            strokeDashoffset={RING * (1 - progress)}
          />
          <defs>
            <linearGradient id="ciq-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff2d8b" />
              <stop offset="1" stopColor="#2da8ff" />
            </linearGradient>
          </defs>
        </svg>
        Top
      </button>

      <button
        type="button"
        onClick={() => openDemo("expert")}
        aria-label="Talk to a CPaaS expert"
        className="ciq-float-pulse pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff2d8b,#9b4dff)] text-white shadow-[0_14px_40px_rgba(255,45,139,0.4)] transition-transform duration-300 hover:scale-105"
      >
        <IconMessageCircle size={26} stroke={1.8} />
      </button>
    </div>
    </>
  );
}
