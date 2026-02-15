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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
