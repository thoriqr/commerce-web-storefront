import { Skeleton } from "@/components/ui/skeleton";

export function OrderStatusSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-24" />

      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>

      <Skeleton className="h-3 w-48" />
    </div>
  );
}
