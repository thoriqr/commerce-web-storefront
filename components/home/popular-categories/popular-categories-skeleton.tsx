import { Skeleton } from "@/components/ui/skeleton";

export function PopularCategoriesSkeleton() {
  return (
    <section className="space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 sm:w-28 rounded-md" />
        ))}
      </div>
    </section>
  );
}
