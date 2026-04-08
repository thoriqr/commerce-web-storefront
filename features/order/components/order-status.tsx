"use client";

import { Button } from "@/components/ui/button";
import { OrderDetail } from "../types";
import { useCountdown } from "../hooks/use-count-down";
import { PaymentStatusBadge } from "./badge/payment-status-badge";
import { OrderStatusBadge } from "./badge/order-status-badge";
import { usePayOrder } from "../hooks/use-pay-order";
import { useCancelOrder } from "../hooks/use-cancel-order";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "../constants";
import { FetchError } from "@/shared/types/api-error";

type Props = {
  data: OrderDetail;
  orderCode: string;
  refetch: () => void;
};

export default function OrderStatus({ data, orderCode, refetch }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const expiresAt = new Date(data.expiresAt);
  const { formatted, isExpired } = useCountdown(expiresAt);

  const { handlePay, isLoading: isPaying } = usePayOrder(orderCode, refetch);

  const cancelMutation = useCancelOrder({
    onSuccess: () => {
      toast.success("Order cancelled");

      // refetch order
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDER, orderCode]
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDERS]
      });

      setOpen(false);
    },

    onError: (error) => {
      if (error instanceof FetchError) {
        toast.error("Request failed", {
          description: error.message,
          duration: 5000
        });

        return;
      }

      // fallback
      toast.error("Something went wrong", {
        duration: 5000
      });
    }
  });

  const isFinalPaymentState = ["PAID", "EXPIRED", "FAILED"].includes(data.paymentStatus);
  const isFinalOrderState = ["CANCELLED", "COMPLETED", "SHIPPED", "DELIVERED"].includes(data.status);

  const canCancel = !isFinalPaymentState && !isFinalOrderState;

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Order</p>
          <p className="font-semibold text-base">{data.orderCode}</p>

          <div className="flex items-center gap-2 pt-1">
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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cancel this order?</DialogTitle>
                  <DialogDescription>Are you sure you want to cancel this order? This action cannot be undone.</DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Keep Order</Button>
                  </DialogClose>

                  <Button
                    variant="destructive"
                    disabled={cancelMutation.isPending}
                    onClick={() => {
                      cancelMutation.mutate(orderCode);
                    }}
                  >
                    {cancelMutation.isPending ? "Cancelling..." : "Yes, Cancel"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="border-t" />

      {/* COUNTDOWN */}
      {data.paymentStatus === "UNPAID" && !isExpired && (
        <p className="text-xs text-muted-foreground">
          Complete your payment within <span className="font-medium text-foreground">{formatted}</span>
        </p>
      )}

      {isExpired && data.paymentStatus === "UNPAID" && <p className="text-xs text-destructive font-medium">Payment has expired</p>}
    </div>
  );
}
