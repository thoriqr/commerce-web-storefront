import { getBannerPlacement } from "@/features/marketing/api";
import { BANNER_PLACEMENTS } from "@/features/marketing/types";
import { HeroCarousel } from "./hero-carousel";
import { Suspense } from "react";
import { HeroCarouselSkeleton } from "./hero-carousel-skeleton";

async function HeroContent() {
  const banners = await getBannerPlacement(BANNER_PLACEMENTS.HOMEPAGE_HERO);

  if (!banners || banners.length === 0) {
    return null;
  }

  return <HeroCarousel banners={banners} />;
}

export function HeroSection() {
  return (
    <Suspense fallback={<HeroCarouselSkeleton />}>
      <HeroContent />
    </Suspense>
  );
}
