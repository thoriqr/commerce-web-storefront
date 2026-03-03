import { FeaturedSection } from "@/components/home/featured/featured-section";
import { HeroSection } from "@/components/home/hero/hero-section";
import { PopularCategoriesSection } from "@/components/home/popular-categories/popular-categories-section";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <PopularCategoriesSection />
      <FeaturedSection />
    </div>
  );
}
