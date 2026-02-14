import { FeaturedCollection } from "@/components/home/featured-collection";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { PopularCategories } from "@/components/home/popular-categories";
import { TrendingProducts } from "@/components/home/trending-products";
import { mockCategories, mockProducts } from "@/constants/mocks";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HeroCarousel />
      <PopularCategories categories={mockCategories} />

      <TrendingProducts title="Trending Right Now" products={mockProducts} />

      <FeaturedCollection title="New Arrivals" products={mockProducts} />

      <FeaturedCollection title="Mid Summer Sale" products={mockProducts} />
    </div>
  );
}
