"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Brand } from "@/lib/content/brands";

const VISIBLE = 10;
const SWAP_MS = 3000;
const STAGGER_S = 0.05;

/**
 * Logo cloud with swap animation. Ten logos on a 5-column grid; every 3s the
 * whole set swaps for the next ten in the pool. Logos enter from the right and
 * exit to the left with a blur that clears, staggered 50ms per tile so the
 * change sweeps across the grid. Pauses while off-screen.
 */
export function LogoCloud({ brands }: { brands: readonly Brand[] }) {
  const [offset, setOffset] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const start = () => {
      if (timer) return;
      timer = window.setInterval(() => setOffset((o) => (o + VISIBLE) % brands.length), SWAP_MS);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.2 });
    io.observe(el);
    return () => {
      stop();
      io.disconnect();
    };
  }, [brands.length]);

  const visible = useMemo(
    () => Array.from({ length: Math.min(VISIBLE, brands.length) }, (_, i) => brands[(offset + i) % brands.length]),
    [brands, offset],
  );

  return (
    <div ref={root} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
      <AnimatePresence mode="popLayout" initial={false}>
        {visible.map((brand, i) => (
          <motion.div
            key={brand.name}
            layout
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * STAGGER_S }}
            className="flex h-24 items-center justify-center rounded-2xl bg-white px-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10 md:h-28"
          >
            {/* Static export: plain <img>; assets are pre-sized 2× PNGs in /public/brands. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.logo} alt={brand.name} className="max-h-14 w-auto max-w-[72%] object-contain md:max-h-16" loading="lazy" decoding="async" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
