import type { Metadata } from "next";
import Image from "next/image";
import { HeroSection } from "@/components/future/HeroSection";
import { FutureHeader } from "@/components/future/FutureHeader";
import { FutureFooter } from "@/components/future/FutureFooter";
import { PedrasDivider } from "@/components/future/PedrasDivider";
import { NewsSection } from "@/components/future/sections/NewsSection";
import { DownloadsSection } from "@/components/future/sections/DownloadsSection";
import { AccountSection } from "@/components/future/sections/AccountSection";
import { WhoIsOnlineSection } from "@/components/future/sections/WhoIsOnlineSection";
import { HighscoresSection } from "@/components/future/sections/HighscoresSection";
import { Top5Podium } from "@/components/future/sections/Top5Podium";
import { LastKillsSection } from "@/components/future/sections/LastKillsSection";
import { GuildsSection } from "@/components/future/sections/GuildsSection";
import { ShopSection } from "@/components/future/sections/ShopSection";
import { RulesSection } from "@/components/future/sections/RulesSection";
import { CommunitySection } from "@/components/future/sections/CommunitySection";

export const metadata: Metadata = {
  title: "LuminOT — A Nova Era",
};

export default function NovoPage() {
  return (
    <div className="relative bg-[#05030f]">
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <Image
          src="/assets/scroll/bg_scroll_trevas.webp"
          alt=""
          fill
          className="object-cover object-top opacity-60"
        />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 15%, rgba(124,58,237,0.18), transparent 35%), radial-gradient(circle at 80% 60%, rgba(99,102,241,0.14), transparent 40%), radial-gradient(rgba(167,139,250,0.5) 1px, transparent 1px)",
            backgroundSize: "auto, auto, 90px 90px",
          }}
        />
      </div>
      <FutureHeader />
      <HeroSection />
      <main className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:px-6">
        <NewsSection />
        <DownloadsSection />
        <AccountSection />
        <WhoIsOnlineSection />
        <HighscoresSection />
        <PedrasDivider />
        <Top5Podium />
        <LastKillsSection />
        <GuildsSection />
        <PedrasDivider />
        <ShopSection />
        <RulesSection />
        <CommunitySection />
      </main>
      <FutureFooter />
    </div>
  );
}
