"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { brand } from "@/lib/brand";
import { contactCopy } from "@/lib/content/home";
import { TextReveal } from "@/components/motion/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export function ContactBlock() {
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-form]"), {
        opacity: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 78%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus("error");
      form.reportValidity();
      return;
    }
    setStatus("success");
    form.reset();
  }

  const field =
    "w-full border-0 border-b border-[var(--ciq-ink)]/20 bg-transparent px-0 py-3 text-sm text-[var(--ciq-ink)] outline-none transition placeholder:text-[var(--ciq-ink)]/40 focus:border-[var(--ciq-pink)]";

  return (
    <section ref={ref} className="ciq-section-soft relative overflow-hidden">
      <div className="kx-container relative grid gap-10 py-14 md:grid-cols-2 md:items-start md:py-16">
        <div data-form className="min-w-0">
          <TextReveal
            text={contactCopy.headline}
            accent={["Conversation."]}
            className="text-[32px] leading-[1.2] font-bold text-[var(--ciq-ink)]"
          />
          <p className="mt-4 max-w-md text-[16px] leading-6 text-[var(--ciq-ink)]/70">
            {contactCopy.body}
          </p>
          <div className="mt-8 space-y-2 text-sm text-[var(--ciq-ink)]/65">
            <p className="font-semibold text-[var(--ciq-ink)]">{brand.contact.company}</p>
            {brand.contact.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="pt-2">
              Sales:{" "}
              <a
                className="text-[var(--ciq-blue)] hover:underline"
                href={`mailto:${brand.contact.salesEmail}`}
              >
                {brand.contact.salesEmail}
              </a>
            </p>
            <p>
              Support:{" "}
              <a
                className="text-[var(--ciq-blue)] hover:underline"
                href={`mailto:${brand.contact.supportEmail}`}
              >
                {brand.contact.supportEmail}
              </a>
            </p>
          </div>
        </div>

        <div data-form className="rounded-[22px] bg-transparent md:pl-6">
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <h3 className="text-xl font-bold text-[var(--ciq-ink)]">Contact Us</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="fullName" required placeholder="Name *" className={field} />
              <input name="company" required placeholder="Company *" className={field} />
              <input
                name="workEmail"
                type="email"
                required
                placeholder="Business Email *"
                className={field}
              />
              <input
                name="phone"
                required
                pattern="[0-9 +\-]{8,20}"
                placeholder="Phone *"
                className={field}
              />
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-[var(--ciq-ink)]">
                I am interested in
              </legend>
              <div className="flex flex-wrap gap-3">
                {contactCopy.channels.map((channel) => (
                  <label
                    key={channel}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--ciq-ink)]/15 bg-white px-3 py-1.5 text-sm text-[var(--ciq-ink)]"
                  >
                    <input
                      type="checkbox"
                      name="channels"
                      value={channel}
                      className="accent-[var(--ciq-pink)]"
                    />
                    {channel}
                  </label>
                ))}
              </div>
            </fieldset>

            <textarea
              name="message"
              required
              rows={3}
              placeholder="Tell us what you are looking to solve *"
              className={`${field} resize-y`}
            />

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[var(--ciq-ink)] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--ciq-black)] sm:w-auto"
            >
              {contactCopy.cta}
            </button>

            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.p
                  key="ok"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-[var(--ciq-blue)]"
                >
                  Thank you! Your consultation request has been received.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  key="err"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-[var(--ciq-pink)]"
                >
                  Please fill in all required fields with valid details.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
