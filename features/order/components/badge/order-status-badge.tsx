import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "../../types";
import { getOrderStatusLabel, getOrderStatusVariant } from "../../utils";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge variant={getOrderStatusVariant(status)}>{getOrderStatusLabel(status)}</Badge>;
}
