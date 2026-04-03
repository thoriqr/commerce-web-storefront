import { Skeleton } from "@/components/ui/skeleton";

export function ShippingSectionSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-36" />

      {/* courier buttons */}
      <div className="flex gap-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>

      {/* services */}
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="border rounded-md p-3">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-32" />
            </div>

            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
