import { Badge } from "@/components/ui/badge";
import { PaymentStatus } from "../../types";
import { getPaymentStatusLabel, getPaymentStatusVariant } from "../../utils";

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <Badge variant={getPaymentStatusVariant(status)}>{getPaymentStatusLabel(status)}</Badge>;
}
