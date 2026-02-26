import { Skeleton } from "@/components/ui/skeleton";

export function PopularCategoriesSkeleton() {
  return (
    <section className="space-y-6">
      {/* Title Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-48" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-background p-4 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    </section>
  );
}
