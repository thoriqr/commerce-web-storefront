import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "../../types";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const map = {
    PENDING: "bg-muted text-muted-foreground",
    PROCESSING: "bg-blue-100 text-blue-700 border-blue-200",
    COMPLETED: "bg-green-100 text-green-700 border-green-200",
    CANCELLED: "bg-red-100 text-red-700 border-red-200"
  };

  return (
    <Badge variant="outline" className={map[status]}>
      {status}
    </Badge>
  );
}
