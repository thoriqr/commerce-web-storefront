import { Skeleton } from "@/components/ui/skeleton";

export function CheckoutStatusSkeleton() {
  return (
    <div className="border rounded-md p-3 space-y-2">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-3 w-48" />
    </div>
  );
}
