"use client";

import { Button } from "@/components/ui/button";

import { useCreateCheckoutSession } from "@/features/checkout/hooks/use-create-checkout-session";
import { CartSummary as Summary } from "../types";
import { formatRupiah } from "@/shared/utils/formatter";

type Props = {
  summary: Summary;
  isMutating: boolean;
  hasUnavailableItem: boolean;
  hasOutOfStock: boolean;
  hasInsufficientStock: boolean;
};

export default function CartSummary({ summary, isMutating, hasUnavailableItem, hasOutOfStock, hasInsufficientStock }: Props) {
  const createCheckout = useCreateCheckoutSession();

  const disableCheckout = isMutating || hasUnavailableItem || hasOutOfStock || hasInsufficientStock;

  let message: string | null = null;

  if (hasUnavailableItem) {
    message = "Remove unavailable items before checkout.";
  } else if (hasOutOfStock) {
    message = "Some items are out of stock.";
  } else if (hasInsufficientStock) {
    message = "Adjust item quantities before checkout.";
  }

  return (
    <div className="sticky bottom-0 border-t bg-background px-5 py-4">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span className="font-medium">{formatRupiah(summary.subtotal)}</span>
      </div>

      <Button className="mt-4 w-full" disabled={disableCheckout || createCheckout.isPending} onClick={() => createCheckout.mutate()}>
        {createCheckout.isPending ? "Processing..." : "Checkout"}
      </Button>

      {message && <p className="text-xs text-destructive mt-2 text-center">{message}</p>}
    </div>
  );
}
