import { Skeleton } from "@/components/ui/skeleton";

export function CheckoutSummarySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-28" />

      <Skeleton className="h-3 w-20" />

      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      <div className="border-t pt-2 flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-28" />
      </div>

      <Skeleton className="h-10 w-full" />
    </div>
  );
}
