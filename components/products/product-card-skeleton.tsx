import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      {/* Image */}
      <div className="relative aspect-square w-full">
        <Skeleton className="absolute inset-0" />
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        {/* Title (2 lines) */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
