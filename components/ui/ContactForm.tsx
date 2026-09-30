"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  submitLabel?: string;
  idPrefix?: string;
  /** Karix modal style: underline fields, no nested heading */
  variant?: "boxed" | "karix";
  showHeading?: boolean;
};

type Status = "idle" | "success" | "error";

const PRODUCTS = [
  "Enterprise SMS",
  "WhatsApp Business",
  "Google RCS",
  "Cloud Telephony",
  "ConnectOne Middleware",
  "Full CPaaS stack",
] as const;

export function ContactForm({
  submitLabel = "Book a Strategy Call",
  idPrefix = "contact",
  variant = "boxed",
  showHeading = true,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");

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

  const isKarix = variant === "karix";

  const field = isKarix
    ? "w-full border-0 border-b border-[var(--ciq-ink)]/15 bg-transparent px-0 py-3.5 text-sm text-[var(--ciq-ink)] outline-none transition placeholder:text-[var(--ciq-ink)]/40 focus:border-[var(--ciq-blue)]"
    : "w-full rounded-xl border border-[var(--ciq-purple)]/20 bg-white px-4 py-3 text-sm text-[var(--ciq-ink)] outline-none transition placeholder:text-[var(--ciq-ink)]/35 focus:border-[var(--ciq-blue)]";

  return (
    <form onSubmit={onSubmit} className="space-y-1" noValidate>
      {showHeading ? (
        <h3 className="mb-4 text-xl font-bold text-[var(--ciq-ink)]">Contact Us</h3>
      ) : null}

      <div className={isKarix ? "space-y-0" : "grid gap-3 sm:grid-cols-2"}>
        {isKarix ? (
          <>
            <input
              id={`${idPrefix}-first`}
              name="firstName"
              required
              placeholder="First name *"
              className={field}
            />
            <input
              id={`${idPrefix}-last`}
              name="lastName"
              required
              placeholder="Last name *"
              className={field}
            />
            <input
              id={`${idPrefix}-email`}
              name="email"
              type="email"
              required
              placeholder="Email *"
              className={field}
            />
            <input
              id={`${idPrefix}-phone`}
              name="phone"
              required
              pattern="[0-9 +\-]{8,20}"
              placeholder="Phone number *"
              className={field}
            />
            <input
              id={`${idPrefix}-designation`}
              name="designation"
              required
              placeholder="Designation *"
              className={field}
            />
            <input
              id={`${idPrefix}-company`}
              name="company"
              required
              placeholder="Company *"
              className={field}
            />
            <select
              id={`${idPrefix}-product`}
              name="product"
              required
              defaultValue=""
              className={`${field} text-[var(--ciq-ink)]/70`}
            >
              <option value="" disabled>
                Product interested in *
              </option>
              {PRODUCTS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <input id={`${idPrefix}-name`} name="name" required placeholder="Name *" className={field} />
            <input
              id={`${idPrefix}-email`}
              name="email"
              type="email"
              required
              placeholder="Email-ID *"
              className={field}
            />
            <input
              id={`${idPrefix}-mobile`}
              name="mobile"
              required
              pattern="[0-9 +\-]{8,20}"
              placeholder="Mobile number *"
              className={field}
            />
            <input
              id={`${idPrefix}-designation`}
              name="designation"
              required
              placeholder="Designation *"
              className={field}
            />
            <input
              id={`${idPrefix}-city`}
              name="city"
              required
              placeholder="City *"
              className={`${field} sm:col-span-2`}
            />
          </>
        )}
      </div>

      {isKarix ? (
        <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-5 text-[var(--ciq-ink)]/65">
          <input
            type="checkbox"
            name="privacy"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--ciq-ink)]/30 accent-[var(--ciq-blue)]"
          />
          <span>
            I agree to the collection and use of my personal data in accordance with the{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-[var(--ciq-blue)] hover:underline"
            >
              Privacy Policy
            </Link>
            .*
          </span>
        </label>
      ) : null}

      <div className={isKarix ? "pt-6" : "pt-2"}>
        <button
          type="submit"
          className={
            isKarix
              ? "inline-flex rounded-full bg-[var(--ciq-blue)] px-8 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              : "btn-pink"
          }
        >
          {submitLabel}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.p
            key="ok"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pt-2 text-sm text-[var(--ciq-blue)]"
          >
            Thank you! Your submission has been received.
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pt-2 text-sm text-[var(--ciq-pink)]"
          >
            Please fill in all required fields with valid details.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
