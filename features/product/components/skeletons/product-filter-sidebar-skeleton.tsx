import { Skeleton } from "@/components/ui/skeleton";

function FilterSectionSkeleton({ type = "checkbox" }: { type?: "checkbox" | "price" }) {
  return (
    <div className="space-y-3">
      {/* Title */}
      <Skeleton className="h-4 w-24" />

      {type === "price" ? (
        <div className="flex gap-2">
          <Skeleton className="h-9 flex-1 rounded-md" />
          <Skeleton className="h-9 flex-1 rounded-md" />
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
      )}
    </div>
  );
}

export function ProductFilterSidebarSkeleton() {
  return (
    <aside className="hidden w-64 shrink-0 md:block">
      <div className="sticky top-20 space-y-8">
        {/* Price Section */}
        <FilterSectionSkeleton type="price" />

        {/* Dimension Sections */}
        <FilterSectionSkeleton />
        <FilterSectionSkeleton />
      </div>
    </aside>
  );
}
