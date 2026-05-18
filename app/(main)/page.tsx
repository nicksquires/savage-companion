import HeroSection from "@/components/home/HeroSection";
import QuickActionPanel from "@/components/home/QuickActionPanel";
import FeatureHighlights from "@/components/home/FeatureHighlights";
import MarketplaceCarousel from "@/components/home/MarketplaceCarousel";
import FeaturedWorlds from "@/components/home/FeaturedWorlds";
import DailyAdventureHook from "@/components/home/DailyAdventureHook";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-base-content">
      <HeroSection />
      <QuickActionPanel />
      <MarketplaceCarousel />
      <FeatureHighlights />
      <DailyAdventureHook />
      {/* <FeaturedWorlds /> */}
    </main>
  );
}
