"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/**
 * GPU particle field: a sheet of ~60k points displaced by layered waves,
 * tinted pink → purple → blue, reacting to the pointer. Reads as "communication
 * flowing at scale" without depicting any device. Pauses when off-screen.
 */
const COLS = 320;
const ROWS = 180;

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vH;
  varying float vX;
  varying float vFade;

  float wave(vec2 p, float t) {
    float h = 0.0;
    h += sin(p.x * 1.6 + t * 0.9) * 0.22;
    h += sin(p.y * 2.3 - t * 0.7 + p.x * 0.8) * 0.16;
    h += sin((p.x + p.y) * 3.1 + t * 1.3) * 0.08;
    h += sin(length(p - uPointer * vec2(4.2, 2.4)) * 3.0 - t * 2.6) * 0.14 * smoothstep(2.2, 0.0, length(p - uPointer * vec2(4.2, 2.4)));
    return h;
  }

  void main() {
    vec3 p = position;
    float h = wave(p.xy, uTime);
    p.z = h;
    vH = h;
    vX = (p.x + 4.2) / 8.4;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vFade = smoothstep(-2.6, 0.6, p.y);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.2 + (h + 0.6) * 1.6 + aSeed * 0.6) * uPixelRatio * (3.2 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  varying float vH;
  varying float vX;
  varying float vFade;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    vec3 pink = vec3(1.0, 0.176, 0.545);
    vec3 purple = vec3(0.608, 0.302, 1.0);
    vec3 blue = vec3(0.176, 0.659, 1.0);
    vec3 col = vX < 0.5 ? mix(pink, purple, vX * 2.0) : mix(purple, blue, (vX - 0.5) * 2.0);
    float lift = smoothstep(-0.4, 0.5, vH);
    col = mix(col * 0.45, col * 1.25, lift);
    float a = (0.35 + lift * 0.65) * vFade * (1.0 - smoothstep(0.12, 0.25, d));
    gl_FragColor = vec4(col, a);
  }
`;

export function FlowField({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    const dpr = Math.min(1.75, window.devicePixelRatio || 1);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.set(0, -3.4, 2.1);
    camera.lookAt(0, 0.4, 0);

    const count = COLS * ROWS;
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c;
        pos[i * 3] = (c / (COLS - 1) - 0.5) * 8.4;
        pos[i * 3 + 1] = (r / (ROWS - 1) - 0.5) * 5.2;
        pos[i * 3 + 2] = 0;
        seed[i] = Math.random();
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPointer: { value: new THREE.Vector2(0, 0) }, uPixelRatio: { value: dpr } },
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      mat.uniforms.uTime.value = clock.getElapsedTime();
      mat.uniforms.uPointer.value.set(pointer.x, pointer.y);
      camera.position.x = pointer.x * 0.25;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={host} aria-hidden className={cn("h-full w-full [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full", className)} />;
}
