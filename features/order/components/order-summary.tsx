import Link from "next/link";
import { OrderDetail } from "../types";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/shared/utils/formatter";
import { useCountdown } from "../hooks/use-count-down";
import { MarkReceivedDialog } from "./mark-received-dialog";

export default function OrderSummary({ data }: { data: OrderDetail }) {
  const { isExpired } = useCountdown(data.expiresAt);

  const showHistoryButton = data.status !== "WAITING_PAYMENT" || isExpired;

  const showReceivedButton = data.shipping.status === "SHIPPED";

  return (
    <div className="space-y-4 text-sm">
      <h2 className="text-sm font-medium">Summary</h2>

      {/* PRICING */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>

          <span>{formatRupiah(data.subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>

          <span>{formatRupiah(data.shippingCost)}</span>
        </div>
      </div>

      {/* TOTAL */}
      <div className="border-t pt-3 flex justify-between font-semibold text-base">
        <span>Total</span>

        <span>{formatRupiah(data.total)}</span>
      </div>

      {/* MARK RECEIVED */}
      {showReceivedButton && <MarkReceivedDialog orderCode={data.orderCode} />}

      {/* BACK TO ORDERS */}
      {showHistoryButton && (
        <Link href="/user/orders">
          <Button variant="outline" className="w-full">
            Back to Orders
          </Button>
        </Link>
      )}
    </div>
  );
}
