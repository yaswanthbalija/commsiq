"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ContactForm } from "@/components/ui/ContactForm";

type DemoIntent = "demo" | "expert";

type DemoContextValue = {
  open: boolean;
  openDemo: (intent?: DemoIntent) => void;
  closeDemo: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function useDemoModal() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemoModal must be used within DemoModalProvider");
  return ctx;
}

/**
 * Karix-style “Connect with an Expert” / Book a Demo overlay —
 * full contact form modal over a blurred dark scrim.
 */
export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<DemoIntent>("expert");

  const openDemo = useCallback((next: DemoIntent = "expert") => {
    setIntent(next);
    setOpen(true);
  }, []);

  const closeDemo = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openDemo, closeDemo }),
    [open, openDemo, closeDemo],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDemo();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeDemo]);

  return (
    <DemoContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close dialog backdrop"
              className="absolute inset-0 bg-[#07112b]/75 backdrop-blur-md"
              onClick={closeDemo}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="demo-title"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.28 }}
              className="relative z-10 max-h-[min(90vh,760px)] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8"
            >
              <div className="mb-2 flex items-start justify-between gap-4">
                <div>
                  <h2
                    id="demo-title"
                    className="text-2xl font-bold tracking-tight text-[var(--ciq-ink)]"
                  >
                    Contact Us
                  </h2>
                  <p className="mt-1 text-sm text-[var(--ciq-ink)]/55">
                    {intent === "expert"
                      ? "Talk to a CPaaS expert. We'll map the right stack for your use case."
                      : "Book a demo and see CommsIQ in action for your team."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeDemo}
                  aria-label="Close"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl text-[var(--ciq-ink)]/50 transition hover:bg-[var(--ciq-mist)] hover:text-[var(--ciq-ink)]"
                >
                  ×
                </button>
              </div>

              <ContactForm
                idPrefix="expert"
                variant="karix"
                showHeading={false}
                submitLabel="Book a Strategy Call"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </DemoContext.Provider>
  );
}
