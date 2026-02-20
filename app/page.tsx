import { FeaturedCollection } from "@/components/home/featured-collection";

import { PopularCategories } from "@/components/home/popular-categories";
import { TrendingProducts } from "@/components/home/trending-products";
import { HeroSection } from "@/features/home/hero/hero-section";
import { mockCategories } from "@/lib/category/mock-categories";
import { mockProducts } from "@/lib/products/mock-products";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <PopularCategories categories={mockCategories} />

      <TrendingProducts title="Trending Right Now" products={mockProducts} />

      <FeaturedCollection title="New Arrivals" products={mockProducts} />

      <FeaturedCollection title="Mid Summer Sale" products={mockProducts} />
    </div>
  );
}
