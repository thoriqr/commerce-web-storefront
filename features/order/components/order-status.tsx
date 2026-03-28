"use client";

import { Button } from "@/components/ui/button";
import { OrderDetail } from "../types";
import { useCountdown } from "../hooks/use-count-down";
import { PaymentStatusBadge } from "./badge/payment-status-badge";
import { OrderStatusBadge } from "./badge/order-status-badge";
import { usePayOrder } from "../hooks/use-pay-order";
import { useCancelOrder } from "../hooks/use-cancel-order";

type Props = {
  data: OrderDetail;
  refetch: () => void;
};

export default function OrderStatus({ data, refetch }: Props) {
  const expiresAt = new Date(data.expiresAt);

  const { formatted, isExpired } = useCountdown(expiresAt);

  const { handlePay, isLoading: isPaying } = usePayOrder(data.orderCode, refetch);
  const cancelMutation = useCancelOrder();

  const canCancel = data.paymentStatus !== "PAID" && data.status !== "CANCELLED" && data.status !== "COMPLETED";

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium">Order Status</h2>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{data.orderCode}</p>

          <div className="flex items-center gap-2">
            <PaymentStatusBadge status={data.paymentStatus} />
            <OrderStatusBadge status={data.status} />
          </div>
        </div>

        <div className="flex gap-2">
          {/* PAY */}
          {data.canPay && !isExpired && (
            <Button size="sm" onClick={handlePay} disabled={isPaying}>
              {isPaying ? "Processing..." : "Pay Now"}
            </Button>
          )}

          {/* CANCEL */}
          {canCancel && (
            <Button
              size="sm"
              variant="outline"
              disabled={cancelMutation.isPending}
              onClick={async () => {
                if (!confirm("Are you sure you want to cancel this order?")) return;

                await cancelMutation.mutateAsync(data.orderCode);
              }}
            >
              {cancelMutation.isPending ? "Cancelling..." : "Cancel"}
            </Button>
          )}
        </div>
      </div>

      {/* Countdown */}
      {data.paymentStatus === "UNPAID" && !isExpired && (
        <p className="text-xs text-muted-foreground">
          Expires in <span className="font-medium">{formatted}</span>
        </p>
      )}

      {isExpired && data.paymentStatus === "UNPAID" && <p className="text-xs text-destructive">Payment expired</p>}
    </div>
  );
}
