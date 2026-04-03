import { Skeleton } from "@/components/ui/skeleton";

export function CheckoutItemsSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-20" />

      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex gap-3 border rounded-md p-3">
          <Skeleton className="size-16 rounded-md" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>

          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}
