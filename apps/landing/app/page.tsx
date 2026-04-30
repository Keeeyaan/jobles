import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { PricingSection } from "@/components/pricing-section";
import { FooterSection } from "@/components/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <HeroSection />
      <PricingSection />
      <FooterSection />
      {/* <FeaturesSection /> */}
    </main>
  );
}
