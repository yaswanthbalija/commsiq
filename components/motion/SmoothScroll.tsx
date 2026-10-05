"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADER_OFFSET = -96;

/**
 * Lenis inertia scrolling synced to GSAP ScrollTrigger.
 * - Starts only when `enabled` (after the brand splash).
 * - Pauses automatically while a modal locks `body { overflow: hidden }`.
 * - Handles same-page hash links (`#contact`, `/#contact`) with an eased scroll.
 */
export function SmoothScroll({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // native touch scrolling on mobile

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time * 1000);
      const locked = document.body.style.overflow === "hidden";
      if (locked && !lenis.isStopped) lenis.stop();
      if (!locked && lenis.isStopped) lenis.start();
    };
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const normalise = (p: string) => (p.replace(/\/+$/, "") || "/");
      const path = href.slice(0, hashIndex);
      const samePage = path === "" || normalise(path) === normalise(window.location.pathname);
      if (!samePage) return;
      const target = document.querySelector<HTMLElement>(href.slice(hashIndex));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.2 });
      window.history.replaceState(null, "", href.slice(hashIndex));
    };
    document.addEventListener("click", onClick);

    if (window.location.hash) {
      const target = document.querySelector<HTMLElement>(window.location.hash);
      if (target) window.setTimeout(() => lenis.scrollTo(target, { offset: HEADER_OFFSET, immediate: true }), 50);
    }

    ScrollTrigger.refresh();
    window.setTimeout(() => ScrollTrigger.refresh(), 180);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [enabled]);

  return null;
}
