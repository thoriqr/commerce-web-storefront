import { Skeleton } from "@/components/ui/skeleton";
import { ProductCarouselSkeleton } from "@/features/product/components/product-carousel-skeleton";

export default function FeaturedSkeleton() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-48" />
      </div>

      <ProductCarouselSkeleton />
    </section>
  );
}
