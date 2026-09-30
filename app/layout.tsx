import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { brand } from "@/lib/brand";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | ${brand.attribution}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  icons: { icon: "/brand/commsiq-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased ciq-splash-active`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-[var(--ciq-ink)]">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
