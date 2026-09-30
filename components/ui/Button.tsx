"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-[var(--ciq-pink)] via-[var(--ciq-purple)] to-[var(--ciq-blue)] text-white shadow-[0_0_30px_rgba(255,45,139,0.25)] hover:brightness-110",
  secondary:
    "border border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10",
  ghost: "text-white/80 hover:text-white",
};

type Common = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
};

export function ButtonLink({
  href,
  children,
  className = "",
  variant = "primary",
}: Common & { href: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
