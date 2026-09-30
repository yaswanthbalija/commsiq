"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brand } from "@/lib/brand";
import { megaMenus } from "@/lib/content/nav";
import { useDemoModal } from "@/components/layout/DemoModal";
import { RollText } from "@/components/motion/RollText";
import { cn } from "@/lib/utils";

/** Hide the bar while scrolling down, bring it back on the first upward scroll. */
function useHideOnScroll(locked: boolean) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (!locked) setHidden(y > last && y > 160);
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [locked]);

  return { hidden: hidden && !locked, scrolled };
}

export function Header() {
  const { openDemo } = useDemoModal();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { hidden, scrolled } = useHideOnScroll(mobileOpen || openMenu !== null);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl transition-[transform,background-color,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        scrolled ? "bg-[var(--ciq-black)]/85 shadow-[0_10px_40px_rgba(5,5,8,0.35)]" : "bg-[var(--ciq-black)]/90",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="kx-container flex h-[78px] items-center justify-between gap-3">
        <Link href="/" className="shrink-0" onClick={() => setOpenMenu(null)}>
          <Image
            src={brand.logoPath}
            alt="commsIQ by Mediacorn Digital"
            width={200}
            height={48}
            className="h-10 w-auto object-contain md:h-11"
            priority
            unoptimized
          />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
          {megaMenus.map((menu) => (
            <div
              key={menu.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(menu.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {menu.href ? (
                <Link
                  href={menu.href}
                  className="whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium text-white/85 transition hover:text-white"
                  aria-expanded={openMenu === menu.label}
                >
                  {menu.label}
                </Link>
              ) : (
                <button
                  type="button"
                  className="whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium text-white/85 transition hover:text-white"
                  aria-expanded={openMenu === menu.label}
                >
                  {menu.label}
                </button>
              )}
              <AnimatePresence>
                {openMenu === menu.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 top-full z-50 w-[min(90vw,640px)] -translate-x-1/2 pt-3"
                  >
                    <div className="rounded-2xl border border-white/10 bg-[var(--ciq-ink)] p-5 shadow-2xl">
                      <div
                        className={`grid gap-6 ${menu.columns.length > 1 ? "md:grid-cols-2" : "grid-cols-1"}`}
                      >
                        {menu.columns.map((col) => (
                          <div key={col.title}>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                              {col.title}
                            </p>
                            <ul className="space-y-1">
                              {col.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="block rounded-xl px-3 py-2 transition hover:bg-white/5"
                                    onClick={() => setOpenMenu(null)}
                                  >
                                    <span className="text-sm font-medium text-white">
                                      {link.label}
                                    </span>
                                    {link.description ? (
                                      <span className="mt-0.5 block text-xs text-white/50">
                                        {link.description}
                                      </span>
                                    ) : null}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => openDemo("expert")}
            className="btn-pink !px-4 !py-2 !text-sm max-sm:!hidden"
          >
            <RollText>Talk to CPaaS expert</RollText>
          </button>
          <button
            type="button"
            className="rounded-full border border-white/20 px-3 py-2 text-sm text-white lg:hidden"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[var(--ciq-black)] lg:hidden"
          >
            <div className="max-h-[70vh] space-y-4 overflow-y-auto px-4 py-4">
              {megaMenus.map((menu) => (
                <div key={menu.label}>
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/45">
                    {menu.label}
                  </p>
                  <div className="space-y-1">
                    {menu.columns.flatMap((c) => c.links).map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-lg px-2 py-2 text-sm text-white/85 hover:bg-white/5"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn-pink w-full"
                onClick={() => {
                  setMobileOpen(false);
                  openDemo("expert");
                }}
              >
                Talk to CPaaS expert
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
