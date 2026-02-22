import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "./product-card-skeleton";

type Props = {
  showLoadMore?: boolean;
};

export function ProductGridSkeleton({ showLoadMore = false }: Props) {
  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

      {/* Load More placeholder */}
      {showLoadMore && (
        <div className="flex justify-center">
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      )}
    </div>
  );
}
