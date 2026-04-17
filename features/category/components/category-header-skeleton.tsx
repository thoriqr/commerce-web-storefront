import { Skeleton } from "@/components/ui/skeleton";

export function CategoryHeaderSkeleton() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Skeleton className="h-4 w-40" />

      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-56" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Subcategories */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 sm:w-28 rounded-md" />
        ))}
      </div>
    </div>
  );
}
