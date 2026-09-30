"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type Motif = "sms" | "whatsapp" | "rcs" | "voice";

const COLORS: Record<Motif, [string, string]> = {
  sms: ["#2da8ff", "#9b4dff"],
  whatsapp: ["#25d366", "#2da8ff"],
  rcs: ["#9b4dff", "#ff2d8b"],
  voice: ["#ff2d8b", "#9b4dff"],
};

/**
 * Generative motion per channel, drawn on canvas:
 *  sms       – throughput lanes: packets racing along parallel lines
 *  whatsapp  – conversation ripples: rounded ripples expanding from two points
 *  rcs       – rich-card lattice: rounded tiles breathing and re-colouring
 *  voice     – radial waveform: bars around a circle following a signal
 */
export function ChannelMotif({ kind, className }: { kind: Motif; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const [c1, c2] = COLORS[kind];

    const layout = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const lanes = Array.from({ length: 9 }, (_, i) => ({ y: (i + 1) / 10, seeds: Array.from({ length: 4 }, () => Math.random()) , speed: 0.08 + Math.random() * 0.12 }));
    const tiles = Array.from({ length: 12 }, (_, i) => ({ i, seed: Math.random() }));

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const t = now / 1000;
      ctx.clearRect(0, 0, w, h);
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, c1);
      grad.addColorStop(1, c2);

      if (kind === "sms") {
        lanes.forEach((lane) => {
          const y = lane.y * h;
          ctx.strokeStyle = "rgba(255,255,255,0.08)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
          lane.seeds.forEach((s) => {
            const x = ((s + t * lane.speed) % 1) * w;
            const len = 40 + s * 80;
            const g = ctx.createLinearGradient(x - len, y, x, y);
            g.addColorStop(0, "rgba(255,255,255,0)");
            g.addColorStop(1, c1);
            ctx.strokeStyle = g;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(x - len, y);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(x, y, 2.2, 0, Math.PI * 2);
            ctx.fill();
          });
        });
      } else if (kind === "whatsapp") {
        const sources = [
          { x: w * 0.32, y: h * 0.42, phase: 0 },
          { x: w * 0.68, y: h * 0.6, phase: 1.7 },
        ];
        sources.forEach((s) => {
          for (let k = 0; k < 6; k++) {
            const p = ((t * 0.35 + k / 6 + s.phase) % 1);
            const r = p * Math.min(w, h) * 0.55;
            ctx.strokeStyle = `${c1}${Math.round((1 - p) * 150).toString(16).padStart(2, "0")}`;
            ctx.lineWidth = 2 - p;
            ctx.beginPath();
            ctx.roundRect(s.x - r, s.y - r * 0.7, r * 2, r * 1.4, r * 0.5);
            ctx.stroke();
          }
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (kind === "rcs") {
        const cols = 4;
        const rows = 3;
        const gap = 14;
        const tw = (w - gap * (cols + 1)) / cols;
        const th = (h - gap * (rows + 1)) / rows;
        tiles.forEach(({ i, seed }) => {
          const cx = i % cols;
          const cy = Math.floor(i / cols);
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + seed * 6.28 + cx * 0.6 + cy * 0.9);
          const x = gap + cx * (tw + gap) + (1 - pulse) * 4;
          const y = gap + cy * (th + gap) + (1 - pulse) * 4;
          const wdt = tw - (1 - pulse) * 8;
          const hgt = th - (1 - pulse) * 8;
          ctx.fillStyle = pulse > 0.72 ? grad : "rgba(255,255,255,0.06)";
          ctx.strokeStyle = "rgba(255,255,255,0.12)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(x, y, wdt, hgt, 14);
          ctx.fill();
          ctx.stroke();
          // media bar + text lines inside the tile
          ctx.fillStyle = pulse > 0.72 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.14)";
          ctx.beginPath();
          ctx.roundRect(x + 12, y + 12, wdt - 24, hgt * 0.42, 8);
          ctx.fill();
          ctx.fillRect(x + 12, y + hgt * 0.42 + 24, (wdt - 24) * 0.7, 4);
          ctx.fillRect(x + 12, y + hgt * 0.42 + 36, (wdt - 24) * 0.45, 4);
        });
      } else {
        const cx = w / 2;
        const cy = h / 2;
        const base = Math.min(w, h) * 0.22;
        const bars = 96;
        for (let i = 0; i < bars; i++) {
          const a = (i / bars) * Math.PI * 2;
          const sig = Math.abs(Math.sin(a * 5 + t * 2.4) * 0.5 + Math.sin(a * 13 - t * 3.1) * 0.3 + Math.sin(t * 6 + i) * 0.2);
          const len = 10 + sig * base * 0.9;
          const x1 = cx + Math.cos(a) * base;
          const y1 = cy + Math.sin(a) * base;
          const x2 = cx + Math.cos(a) * (base + len);
          const y2 = cy + Math.sin(a) * (base + len);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, base - 8, 0, Math.PI * 2);
        ctx.stroke();
        const ring = (t * 0.6) % 1;
        ctx.strokeStyle = `rgba(255,255,255,${(1 - ring) * 0.5})`;
        ctx.beginPath();
        ctx.arc(cx, cy, base * 0.5 + ring * base * 0.5, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    layout();
    window.addEventListener("resize", layout);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", layout);
    };
  }, [kind]);

  return <canvas ref={ref} aria-hidden className={cn("block h-full w-full", className)} />;
}
