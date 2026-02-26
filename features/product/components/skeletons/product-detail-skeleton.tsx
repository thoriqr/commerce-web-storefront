import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-6 w-40" />

      <div className="grid gap-10 md:grid-cols-2">
        <Skeleton className="aspect-square rounded-xl" />

        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
