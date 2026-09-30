"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const KEY = "commsiq-cookie-consent";
const EVENT = "commsiq-cookie";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(EVENT, onStoreChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(KEY) !== "1";
}

function getServerSnapshot() {
  return false;
}

export function CookieBanner() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function accept() {
    window.localStorage.setItem(KEY, "1");
    window.dispatchEvent(new Event(EVENT));
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-3xl rounded-2xl border border-[var(--ciq-purple)]/20 bg-white p-4 shadow-2xl md:inset-x-auto md:right-6 md:left-auto"
        >
          <p className="text-sm text-[var(--ciq-ink)]/80">
            By clicking &quot;Ok, got it&quot;, you agree to the storing of cookies on your device to
            enhance site navigation, analyze site usage, and assist in our marketing efforts. View
            our{" "}
            <Link href="/privacy-policy" className="text-[var(--ciq-blue)] underline-offset-2 hover:underline">
              Privacy Policy
            </Link>{" "}
            for more information.
          </p>
          <div className="mt-3 flex justify-end">
            <button type="button" onClick={accept} className="btn-pink">
              Ok, got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
