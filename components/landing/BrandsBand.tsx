import { TextReveal } from "@/components/motion/TextReveal";
import { brands } from "@/lib/content/brands";
import { LogoCloud } from "./LogoCloud";

/** Brands we have worked with: swap-animation logo cloud under a logo-bar eyebrow. */
export function BrandsBand() {
  return (
    <section id="brands" className="relative overflow-hidden border-y border-white/10 bg-[#050508] py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="ciq-glow ciq-glow--purple left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 opacity-50" />
      </div>
      <div className="kx-container relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="ciq-logo-bar w-12" aria-hidden />
              <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/70">Brands we have worked with</p>
            </div>
            <TextReveal
              text="Trusted across industries, from aviation to retail."
              accent={["Trusted"]}
              className="mt-4 max-w-3xl text-[clamp(1.7rem,3.4vw,2.8rem)] font-extrabold leading-[1.05] tracking-[-0.02em]"
            />
          </div>
          <p className="max-w-sm text-[15px] leading-7 text-white/60">{brands.length} brands across aviation, retail, BFSI, FMCG, media, education and technology.</p>
        </div>

        <div className="mt-12">
          <LogoCloud brands={brands} />
        </div>
      </div>
    </section>
  );
}
