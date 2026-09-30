import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";
import {
  footerCompanyLinks,
  growthStackLinks,
  platformLinks,
  productLinks,
  solutionLinks,
} from "@/lib/content/nav";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--ciq-black)] text-white">
      <div
        className="relative z-10 h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--ciq-pink) 0%, var(--ciq-purple) 50%, var(--ciq-blue) 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="ciq-glow ciq-glow--pink -left-24 top-10 h-[380px] w-[380px]" />
        <span className="ciq-glow ciq-glow--purple left-1/2 top-1/3 h-[420px] w-[420px]" />
        <span className="ciq-glow ciq-glow--blue -right-20 bottom-0 h-[360px] w-[360px]" />
      </div>

      <div className="kx-container relative z-10 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Image
              src={brand.logoPath}
              alt="commsIQ"
              width={180}
              height={44}
              className="h-10 w-auto object-contain"
              unoptimized
            />
            <p className="mt-4 max-w-md text-sm font-semibold text-white">
              {brand.tagline}
            </p>
            <p className="mt-2 text-sm text-white/55">
              SMS | WhatsApp | RCS | Voice
            </p>
            <p className="mt-2 text-sm text-white/45">{brand.taglineLine}</p>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-white/45 uppercase">
              Products
            </p>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-[var(--ciq-pink)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-white/45 uppercase">
              Platform
            </p>
            <ul className="mt-4 space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-[var(--ciq-pink)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-bold tracking-[0.18em] text-white/45 uppercase">
              Solutions
            </p>
            <ul className="mt-4 space-y-2.5">
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-[var(--ciq-pink)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-[var(--ciq-pink)] uppercase">
              Growth Stack
            </p>
            <ul className="mt-4 space-y-2.5">
              {growthStackLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-[var(--ciq-pink)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-bold tracking-[0.18em] text-white/45 uppercase">
              Company
            </p>
            <ul className="mt-4 space-y-2.5">
              {footerCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-[var(--ciq-pink)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-white/45 uppercase">
              Contact
            </p>
            <p className="mt-4 text-sm font-semibold text-white">{brand.contact.company}</p>
            {brand.contact.addressLines.map((line) => (
              <p key={line} className="text-sm text-white/55">
                {line}
              </p>
            ))}
            <div className="mt-4 space-y-2 text-sm text-white/60">
              <p>
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
              <p>
                <a
                  className="text-[var(--ciq-blue)] hover:underline"
                  href={`https://${brand.domain}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {brand.domain}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 bg-[var(--ciq-ink)]/80 px-4 py-5 text-xs text-white/40 sm:flex-row sm:px-8 md:px-12 lg:px-[max(1.5rem,calc((100%-1280px)/2+1.5rem))]">
        <p>
          Copyright © {new Date().getFullYear()}, {brand.legalName}. All rights reserved.
        </p>
        <p className="text-white/30">{brand.name}</p>
      </div>
    </footer>
  );
}
