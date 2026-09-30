"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandSplash } from "@/components/motion/BrandSplash";
import { FloatingControls } from "@/components/motion/FloatingControls";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { DemoModalProvider } from "@/components/layout/DemoModal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";

gsap.registerPlugin(ScrollTrigger);

type SplashContextValue = {
  splashDone: boolean;
};

const SplashContext = createContext<SplashContextValue>({ splashDone: false });

export function useSplash() {
  return useContext(SplashContext);
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [splashDone, setSplashDone] = useState(false);
  const value = useMemo(() => ({ splashDone }), [splashDone]);
  const handleSplashComplete = useCallback(() => setSplashDone(true), []);

  // Keep scroll locked from first paint until splash finishes (no scrollbar flash)
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (splashDone) {
      root.classList.remove("ciq-splash-active");
      // Unlock may change layout — refresh scroll reveals that waited under splash
      ScrollTrigger.refresh();
    } else {
      root.classList.add("ciq-splash-active");
    }
  }, [splashDone]);

  return (
    <DemoModalProvider>
      <SplashContext.Provider value={value}>
        {/* Splash is in the first HTML paint — not delayed behind a mount gate */}
        {!splashDone ? <BrandSplash onComplete={handleSplashComplete} /> : null}
        <SmoothScroll enabled={splashDone} />
        <div id="ciq-site-reveal" className="flex min-h-full flex-1 flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          {splashDone ? <CookieBanner /> : null}
          {splashDone ? <FloatingControls /> : null}
        </div>
      </SplashContext.Provider>
    </DemoModalProvider>
  );
}
