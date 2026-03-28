import { Badge } from "@/components/ui/badge";
import { PaymentStatus } from "../../types";

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const map = {
    UNPAID: "bg-yellow-100 text-yellow-700 border-yellow-200",
    PAID: "bg-green-100 text-green-700 border-green-200",
    FAILED: "bg-red-100 text-red-700 border-red-200",
    EXPIRED: "bg-muted text-muted-foreground"
  };

  return (
    <Badge variant="outline" className={map[status]}>
      {status}
    </Badge>
  );
}
