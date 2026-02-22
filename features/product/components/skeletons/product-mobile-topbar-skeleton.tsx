import { Skeleton } from "@/components/ui/skeleton";

export function ProductMobileTopBarSkeleton() {
  return (
    <div className="sticky top-28 z-40 md:hidden">
      <div className="rounded-lg border bg-background shadow-sm">
        <div className="flex h-12 items-center justify-between px-3 gap-1.5">
          {/* Filter Button Skeleton */}
          <Skeleton className="h-9 w-24 rounded-md" />

          {/* Sort Select Skeleton */}
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
}
