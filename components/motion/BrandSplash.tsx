"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { brand } from "@/lib/brand";

type Props = {
  onComplete?: () => void;
};

const { pink, purple, blue, black } = brand.colors;
const LOGO_GRADIENT = `linear-gradient(135deg, ${pink} 0%, ${purple} 50%, ${blue} 100%)`;

/**
 * Karix sequence, logo palette only (pink / purple / blue / black):
 * 1) tagline → 2) “commsIQ” wordmark → 3) circular iris wipe → site
 */
export function BrandSplash({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const root = rootRef.current;
    const tag = tagRef.current;
    const word = wordRef.current;
    const wipe = wipeRef.current;
    if (!root || !tag || !word || !wipe) return;

    let finished = false;
    // Scroll lock is owned by SiteShell + html.ciq-splash-active (no body.style thrash)

    const finish = () => {
      if (finished) return;
      finished = true;
      setGone(true);
      onCompleteRef.current?.();
    };

    const wipeState = { radius: 0 };

    // Clear any Tailwind opacity so GSAP owns visibility for the whole sequence
    gsap.set(tag, { autoAlpha: 1, scale: 1, clearProps: "visibility" });
    gsap.set(word, { autoAlpha: 0, scale: 0.86 });
    gsap.set(wipe, { autoAlpha: 1 });
    gsap.set(root, { autoAlpha: 1 });
    wipe.style.clipPath = "circle(0% at 50% 50%)";

    // Always play the branded intro (tagline → wordmark → iris).
    // OS “reduce motion” should not skip this one-shot identity moment.
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: finish,
    });

    tl.to({}, { duration: 0.85 })
      .to(tag, { autoAlpha: 0, scale: 0.92, duration: 0.36, ease: "power2.in" })
      .to(
        word,
        { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power2.out" },
        "+=0.08",
      )
      .to({}, { duration: 0.85 })
      .to(word, { autoAlpha: 0, duration: 0.3, ease: "power1.out" }, ">-0.05")
      .to(
        wipeState,
        {
          radius: 160,
          duration: 0.95,
          ease: "power2.inOut",
          onUpdate: () => {
            wipe.style.clipPath = `circle(${wipeState.radius}% at 50% 50%)`;
          },
        },
        "<",
      )
      .to(root, { autoAlpha: 0, duration: 0.4, ease: "power2.inOut" }, "-=0.15");

    // Safety: never leave the site locked if the timeline stalls
    const safety = window.setTimeout(finish, 6500);

    return () => {
      window.clearTimeout(safety);
      tl.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="ciq-brand-splash fixed inset-0 z-[9999] overflow-hidden"
      role="status"
      aria-label="Loading commsIQ"
      style={{
        background: black,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <div
        ref={wipeRef}
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: LOGO_GRADIENT,
          clipPath: "circle(0% at 50% 50%)",
          willChange: "clip-path",
        }}
      />

      <div className="absolute inset-0 z-30 flex items-center justify-center px-4">
        <p
          ref={tagRef}
          className="m-0 max-w-[720px] select-none text-center font-semibold leading-snug tracking-[-0.02em]"
          style={{
            fontSize: "clamp(1.2rem, 3.8vw, 2.1rem)",
            color: blue,
          }}
        >
          The only <span style={{ color: pink }}>engagement</span> partner you
          need
        </p>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <div
          ref={wordRef}
          className="flex items-center justify-center"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <Image
            src={brand.logoPath}
            alt="commsIQ by Mediacorn Digital"
            width={560}
            height={140}
            priority
            unoptimized
            className="h-auto w-[min(86vw,560px)] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
