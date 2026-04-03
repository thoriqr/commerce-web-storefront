import { Skeleton } from "@/components/ui/skeleton";

export function ShippingAddressSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-24" />

      <div className="space-y-2">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-3 w-32" />
      </div>

      <div className="border-t" />

      <div className="space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}
