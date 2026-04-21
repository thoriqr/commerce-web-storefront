import { Skeleton } from "@/components/ui/skeleton";
import { useCheckoutWarehouseOrigin } from "../hooks/use-checkout-warehouse-origin";

export default function CheckoutOrigin() {
  const { data, isLoading } = useCheckoutWarehouseOrigin();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-3 w-16 bg-muted rounded" />
        <Skeleton className="h-4 w-32 bg-muted rounded" />
        <Skeleton className="h-3 w-40 bg-muted rounded" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-1 text-sm">
      <p className="text-xs text-muted-foreground">From</p>

      <p className="font-medium">{data.name}</p>

      <p className="text-xs text-muted-foreground leading-relaxed">{[data.district, data.city, data.province].filter(Boolean).join(", ")}</p>
    </div>
  );
}
