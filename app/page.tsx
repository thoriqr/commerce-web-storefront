import { FeaturedCollection } from "@/components/home/featured-collection";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { PopularCategories } from "@/components/home/popular-categories";
import { TrendingProducts } from "@/components/home/trending-products";

import { mockCategories } from "@/lib/category/mock-categories";
import { mockProducts } from "@/lib/products/mock-products";

// fetch all any related about this component

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
