"use client";

import { Button } from "@/components/ui/button";
import { CartSummary as Summary } from "../types";
import { formatCurrency } from "@/features/product/utils/format-currency";

type Props = {
  summary: Summary;
};

export default function CartSummary({ summary }: Props) {
  return (
    <div className="sticky bottom-0 border-t bg-background px-5 py-4">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span className="font-medium">Rp {formatCurrency(summary.subtotal)}</span>
      </div>

      <Button className="mt-4 w-full">Checkout</Button>
    </div>
  );
}
