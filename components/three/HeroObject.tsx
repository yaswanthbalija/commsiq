"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { ChannelLogo, type ChannelKey } from "@/components/ui/ChannelLogo";
import { cn } from "@/lib/utils";
import { CORE_FRAG, CORE_VERT } from "./nexusShaders";

/**
 * Conversation Nexus — the commsIQ core.
 *
 * An obsidian sphere with brand energy moving under its surface sits at the
 * centre of four channel orbits (SMS, WhatsApp, RCS, Voice). Message packets
 * fire from the orbits into the core and back out; every arrival flashes the
 * core in that channel's colour and throws a shockwave. Channel labels ride
 * their orbits and a live counter ticks with each routed conversation.
 */

type Channel = { key: ChannelKey; color: number; radius: number; tilt: [number, number, number]; speed: number; beads: number };

const CHANNELS: Channel[] = [
  { key: "sms", color: 0x2da8ff, radius: 1.5, tilt: [1.2, 0.15, 0.25], speed: 0.42, beads: 9 },
  { key: "whatsapp", color: 0x25d366, radius: 1.85, tilt: [0.5, 0.95, -0.35], speed: -0.3, beads: 11 },
  { key: "rcs", color: 0x9b4dff, radius: 2.2, tilt: [1.55, -0.55, 0.85], speed: 0.24, beads: 13 },
  { key: "voice", color: 0xff2d8b, radius: 2.55, tilt: [0.85, 1.7, 0.4], speed: -0.18, beads: 15 },
];

const PULSE_POOL = 10;
const PULSE_LIFE = 0.85;
const WAVE_LIFE = 0.7;
const SPAWN_EVERY = 0.38;

type Orbit = { group: THREE.Group; beads: THREE.InstancedMesh; glows: THREE.InstancedMesh; phase: Float32Array; ch: Channel };
type Pulse = { mesh: THREE.Mesh; from: THREE.Vector3; to: THREE.Vector3; t: number; active: boolean; ch: Channel; inbound: boolean };
type Wave = { mesh: THREE.Mesh; t: number; active: boolean };

function makeHaloTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(155,77,255,1)");
  grad.addColorStop(0.3, "rgba(255,45,139,0.55)");
  grad.addColorStop(0.7, "rgba(45,168,255,0.12)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function HeroObject({ className, progressRef }: { className?: string; progressRef?: React.MutableRefObject<number> }) {
  const host = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    el.insertBefore(renderer.domElement, el.firstChild);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    camera.position.set(0, 0.15, 12.2);

    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(-3, 4, 5);
    scene.add(key, new THREE.AmbientLight(0xffffff, 0.12));

    const root = new THREE.Group();
    scene.add(root);

    // halo behind the core
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeHaloTexture(), transparent: true, depthWrite: false, premultipliedAlpha: true }));
    halo.scale.setScalar(6.4);
    root.add(halo);

    // core
    const coreMat = new THREE.ShaderMaterial({
      vertexShader: CORE_VERT,
      fragmentShader: CORE_FRAG,
      uniforms: { uTime: { value: 0 }, uFlash: { value: 0 }, uFlashColor: { value: new THREE.Color(0xff2d8b) } },
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.95, 96, 96), coreMat);
    root.add(core);
    // glossy clearcoat shell (no transmission — renders identically everywhere)
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(0.985, 96, 96),
      new THREE.MeshPhysicalMaterial({ color: 0x0a0a14, metalness: 0.1, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.06, transparent: true, opacity: 0.28, premultipliedAlpha: true, envMapIntensity: 1.4 }),
    );
    root.add(shell);

    // channel orbits
    const beadGeo = new THREE.SphereGeometry(0.05, 14, 14);
    const glowGeo = new THREE.SphereGeometry(0.14, 10, 10);
    const orbits: Orbit[] = CHANNELS.map((ch) => {
      const group = new THREE.Group();
      group.rotation.set(...ch.tilt);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(ch.radius, 0.018, 12, 240),
        new THREE.MeshStandardMaterial({ color: ch.color, emissive: ch.color, emissiveIntensity: 0.55, metalness: 0.7, roughness: 0.25, envMapIntensity: 1.2 }),
      );
      group.add(ring);
      const beads = new THREE.InstancedMesh(beadGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: ch.color, emissiveIntensity: 3.2, roughness: 0.2 }), ch.beads);
      const glows = new THREE.InstancedMesh(
        glowGeo,
        new THREE.MeshBasicMaterial({ color: ch.color, transparent: true, opacity: 0.32, premultipliedAlpha: true, depthWrite: false }),
        ch.beads,
      );
      const phase = new Float32Array(ch.beads);
      for (let k = 0; k < ch.beads; k++) phase[k] = (k / ch.beads) * Math.PI * 2 + Math.random() * 0.25;
      group.add(beads, glows);
      root.add(group);
      return { group, beads, glows, phase, ch };
    });

    // pulse + wave pools
    const pulseGeo = new THREE.SphereGeometry(0.07, 12, 12);
    const pulses: Pulse[] = Array.from({ length: PULSE_POOL }, () => {
      const mesh = new THREE.Mesh(pulseGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1, premultipliedAlpha: true, depthWrite: false }));
      mesh.visible = false;
      root.add(mesh);
      return { mesh, from: new THREE.Vector3(), to: new THREE.Vector3(), t: 0, active: false, ch: CHANNELS[0], inbound: true };
    });
    const waveGeo = new THREE.RingGeometry(0.96, 1.02, 96);
    const waves: Wave[] = Array.from({ length: 6 }, () => {
      const mesh = new THREE.Mesh(waveGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, side: THREE.DoubleSide, premultipliedAlpha: true, depthWrite: false }));
      mesh.visible = false;
      root.add(mesh);
      return { mesh, t: 0, active: false };
    });

    const dummy = new THREE.Object3D();
    const tmp = new THREE.Vector3();
    const tmp2 = new THREE.Vector3();
    let routed = 12480;
    let spawnAt = 0.6;

    const beadWorld = (o: Orbit, k: number, t: number, out: THREE.Vector3) => {
      const a = o.phase[k] + t * o.ch.speed;
      out.set(Math.cos(a) * o.ch.radius, Math.sin(a) * o.ch.radius, 0);
      o.group.localToWorld(out);
      root.worldToLocal(out);
      return out;
    };

    const spawnPulse = (t: number) => {
      const p = pulses.find((x) => !x.active);
      if (!p) return;
      const o = orbits[Math.floor(Math.random() * orbits.length)];
      const k = Math.floor(Math.random() * o.ch.beads);
      beadWorld(o, k, t, tmp);
      p.inbound = Math.random() > 0.35;
      p.ch = o.ch;
      if (p.inbound) {
        p.from.copy(tmp);
        p.to.copy(tmp).normalize().multiplyScalar(0.98);
      } else {
        p.from.copy(tmp).normalize().multiplyScalar(0.98);
        p.to.copy(tmp);
      }
      p.t = 0;
      p.active = true;
      p.mesh.visible = true;
      (p.mesh.material as THREE.MeshBasicMaterial).color.set(o.ch.color).lerp(new THREE.Color(0xffffff), 0.35);
    };

    const fireWave = (dir: THREE.Vector3, color: number) => {
      const w = waves.find((x) => !x.active);
      if (!w) return;
      w.active = true;
      w.t = 0;
      w.mesh.visible = true;
      (w.mesh.material as THREE.MeshBasicMaterial).color.set(color);
      w.mesh.position.set(0, 0, 0);
      w.mesh.lookAt(dir);
    };

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    let W = 1;
    let H = 1;
    const resize = () => {
      const r = el.getBoundingClientRect();
      W = r.width;
      H = r.height;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    const clock = new THREE.Clock();
    let last = 0;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      const dt = Math.min(0.05, t - last);
      last = t;
      const p = progressRef?.current ?? 0;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      coreMat.uniforms.uTime.value = t;
      coreMat.uniforms.uFlash.value *= 1 - dt * 5.5;
      core.rotation.y = t * 0.12;
      shell.rotation.y = -t * 0.04;
      halo.material.opacity = 0.75 + Math.sin(t * 1.4) * 0.12;
      root.rotation.y = pointer.x * 0.35 + t * 0.11;
      root.rotation.x = pointer.y * 0.22 + Math.sin(t * 0.27) * 0.06;
      root.scale.setScalar(1 - p * 0.3);
      root.position.y = -p * 1.6;

      orbits.forEach((o, i) => {
        o.group.rotation.z += dt * 0.09 * (i % 2 ? -1 : 1);
        for (let k = 0; k < o.ch.beads; k++) {
          const a = o.phase[k] + t * o.ch.speed;
          dummy.position.set(Math.cos(a) * o.ch.radius, Math.sin(a) * o.ch.radius, 0);
          dummy.scale.setScalar(0.85 + 0.45 * (0.5 + 0.5 * Math.sin(a * 3 + t * 2.4)));
          dummy.updateMatrix();
          o.beads.setMatrixAt(k, dummy.matrix);
          o.glows.setMatrixAt(k, dummy.matrix);
        }
        o.beads.instanceMatrix.needsUpdate = true;
        o.glows.instanceMatrix.needsUpdate = true;
      });

      if (t > spawnAt) {
        spawnPulse(t);
        spawnAt = t + SPAWN_EVERY * (0.7 + Math.random() * 0.6);
      }
      pulses.forEach((pu) => {
        if (!pu.active) return;
        pu.t += dt / PULSE_LIFE;
        const e = pu.t < 1 ? 1 - Math.pow(1 - pu.t, 3) : 1;
        pu.mesh.position.lerpVectors(pu.from, pu.to, e);
        const s = 0.7 + Math.sin(pu.t * Math.PI) * 0.9;
        pu.mesh.scale.setScalar(s);
        if (pu.t >= 1) {
          pu.active = false;
          pu.mesh.visible = false;
          if (pu.inbound) {
            coreMat.uniforms.uFlash.value = 1;
            coreMat.uniforms.uFlashColor.value.set(pu.ch.color);
            fireWave(tmp2.copy(pu.from), pu.ch.color);
            routed += 1 + Math.floor(Math.random() * 3);
            if (counterRef.current) counterRef.current.textContent = routed.toLocaleString("en-IN");
          }
        }
      });
      waves.forEach((w) => {
        if (!w.active) return;
        w.t += dt / WAVE_LIFE;
        const s = 1 + w.t * 1.6;
        w.mesh.scale.setScalar(s);
        (w.mesh.material as THREE.MeshBasicMaterial).opacity = (1 - w.t) * 0.7;
        if (w.t >= 1) {
          w.active = false;
          w.mesh.visible = false;
        }
      });

      // channel labels ride bead 0 of their orbit
      orbits.forEach((o, i) => {
        const node = labelRefs.current[i];
        if (!node) return;
        beadWorld(o, 0, t, tmp);
        root.localToWorld(tmp);
        const depth = tmp.z;
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * W;
        const y = (-tmp.y * 0.5 + 0.5) * H;
        const front = depth > -0.4;
        node.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(14px, -50%) scale(${front ? 1 : 0.82})`;
        node.style.opacity = String((front ? 0.95 : 0.35) * (1 - p * 1.3));
      });

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Sprite) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, [progressRef]);

  return (
    <div ref={host} aria-hidden className={cn("relative h-full w-full [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full", className)}>
      {CHANNELS.map((ch, i) => (
        <div
          key={ch.key}
          ref={(n) => {
            labelRefs.current[i] = n;
          }}
          className="pointer-events-none absolute left-0 top-0 flex items-center gap-2 rounded-full border border-white/12 bg-[#0b0b14]/80 py-1 pl-1 pr-3 text-[11px] font-semibold tracking-wide text-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md will-change-transform"
          style={{ opacity: 0 }}
        >
          <ChannelLogo channel={ch.key} size="sm" withLabel />
        </div>
      ))}
      <div className="pointer-events-none absolute bottom-[6%] right-[8%] rounded-2xl border border-white/10 bg-[#0b0b14]/70 px-4 py-3 backdrop-blur-md">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">Conversations routed · live</p>
        <p className="mt-1 font-mono text-[22px] font-semibold tabular-nums text-white">
          <span ref={counterRef}>12,480</span>
          <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-[#25d366] align-middle" />
        </p>
      </div>
    </div>
  );
}
