import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "./product-card-skeleton";

export function ProductListingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Mobile Controls (sticky mimic) */}
      <div className="md:hidden">
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden w-64 shrink-0 md:block space-y-6">
          <Skeleton className="h-6 w-32" />

          <div className="space-y-4">
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Desktop Top Bar */}
          <div className="hidden items-center justify-between md:flex">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-9 w-40 rounded-md" />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
