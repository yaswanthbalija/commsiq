import { Hero } from "@/components/landing/Hero";
import { PillarsStatement } from "@/components/landing/PillarsStatement";
import { ChannelTrack } from "@/components/landing/ChannelTrack";
import { JourneyPath } from "@/components/landing/JourneyPath";
import { LifecycleStack } from "@/components/landing/LifecycleStack";
import { WhyGrid } from "@/components/landing/WhyGrid";
import { IndustryList } from "@/components/landing/IndustryList";
import { AboutStats } from "@/components/landing/AboutStats";
import { BrandsBand } from "@/components/landing/BrandsBand";
import { GrowthBand } from "@/components/landing/GrowthBand";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { SectionIndex } from "@/components/landing/SectionIndex";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionIndex />
      {/* Landing body sits above the hero */}
      <div className="ciq-over-hero bg-[#08080f]">
        <PillarsStatement />
        <ChannelTrack />
        <JourneyPath />
        <LifecycleStack />
        <WhyGrid />
        <IndustryList />
        <AboutStats />
        <BrandsBand />
        <GrowthBand />
        <div id="contact">
          <ContactBlock />
        </div>
      </div>
    </>
  );
}
