import { Skeleton } from "@/components/ui/skeleton";

export function AddressSectionSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-32" />

      <div className="border rounded-md p-3 space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-full" />

        <Skeleton className="h-8 w-28 mt-2" />
      </div>
    </div>
  );
}
