"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Full-funnel flow: particles enter from four pillar lanes on the left,
 * converge through Impression → Interaction → Conversion, drop-offs fade at
 * each gate and conversions pop at the exit. Canvas 2D, DPR aware, paused
 * when off-screen.
 */

const LANES = ["#2da8ff", "#9b4dff", "#25d366", "#ff2d8b"]; // audience, advertising, messaging, voice
const GATES = [0.36, 0.68]; // x positions of stage boundaries (0..1)
const KEEP = [0.62, 0.55]; // survival probability at each gate

type P = { x: number; y: number; lane: number; vx: number; jitter: number; alpha: number; dead: boolean; gate: number; pop: number };

export function FunnelFlow({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const ps: P[] = [];
    const laneY = (lane: number) => H * (0.14 + lane * 0.24);
    // funnel half-height at x (0..1): wide at entry, tight at exit
    const half = (u: number) => H * (0.42 - 0.3 * Math.pow(u, 1.4));

    const spawn = () => {
      const lane = Math.floor(Math.random() * 4);
      ps.push({ x: -10, y: laneY(lane), lane, vx: 1.2 + Math.random() * 0.9, jitter: Math.random() * Math.PI * 2, alpha: 1, dead: false, gate: 0, pop: 0 });
    };

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.05 });
    io.observe(canvas);

    let raf = 0;
    let t = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible || W === 0) return;
      t += 1;
      if (t % 2 === 0) spawn();

      ctx.clearRect(0, 0, W, H);

      // funnel fill
      const fill = ctx.createLinearGradient(0, 0, W, 0);
      fill.addColorStop(0, "rgba(45,168,255,0.05)");
      fill.addColorStop(1, "rgba(255,45,139,0.10)");
      ctx.fillStyle = fill;
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const u = i / 60;
        const y = H / 2 - half(u);
        if (i === 0) ctx.moveTo(u * W, y);
        else ctx.lineTo(u * W, y);
      }
      for (let i = 60; i >= 0; i--) {
        const u = i / 60;
        ctx.lineTo(u * W, H / 2 + half(u));
      }
      ctx.closePath();
      ctx.fill();

      // funnel outline
      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, "rgba(45,168,255,0.35)");
      grad.addColorStop(0.5, "rgba(155,77,255,0.35)");
      grad.addColorStop(1, "rgba(255,45,139,0.5)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const u = i / 60;
        const x = u * W;
        const y = H / 2 - half(u);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const u = i / 60;
        const x = u * W;
        const y = H / 2 + half(u);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // gates
      GATES.forEach((g) => {
        const x = g * W;
        ctx.strokeStyle = "rgba(255,255,255,0.14)";
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        ctx.moveTo(x, H / 2 - half(g) - 10);
        ctx.lineTo(x, H / 2 + half(g) + 10);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // particles
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        const u = Math.max(0, Math.min(1, p.x / W));
        const target = H / 2 + (laneY(p.lane) - H / 2) * (half(u) / half(0));
        p.y += (target - p.y) * 0.08 + Math.sin(t * 0.05 + p.jitter) * 0.25;
        p.x += p.vx;

        if (p.gate < GATES.length && u >= GATES[p.gate]) {
          if (Math.random() > KEEP[p.gate]) p.dead = true;
          p.gate += 1;
        }
        if (p.dead) p.alpha -= 0.05;
        if (u >= 0.985 && !p.dead) p.pop += 1;

        const r = p.dead ? 2 : 2.4 + u * 2.2;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.pop ? "#ffffff" : LANES[p.lane];
        ctx.shadowColor = LANES[p.lane];
        ctx.shadowBlur = p.pop ? 22 : 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + p.pop * 0.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        if (p.alpha <= 0 || p.x > W + 20 || p.pop > 8) ps.splice(i, 1);
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={cn("block h-full w-full", className)} />;
}
