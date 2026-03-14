"use client";

import { Button } from "@/components/ui/button";
import { CartSummary as Summary } from "../types";
import { formatCurrency } from "@/features/product/utils/format-currency";

type Props = {
  summary: Summary;
  isMutating: boolean;
  hasUnavailableItem: boolean;
  hasOutOfStock: boolean;
  hasInsufficientStock: boolean;
};

export default function CartSummary({ summary, isMutating, hasUnavailableItem, hasOutOfStock, hasInsufficientStock }: Props) {
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
        <span className="font-medium">Rp {formatCurrency(summary.subtotal)}</span>
      </div>

      <Button className="mt-4 w-full" disabled={disableCheckout}>
        Checkout
      </Button>

      {message && <p className="text-xs text-destructive mt-2 text-center">{message}</p>}
    </div>
  );
}
