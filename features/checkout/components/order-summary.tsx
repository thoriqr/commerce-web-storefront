import { Button } from "@/components/ui/button";
import { CheckoutSession } from "../types";
import { reasonMap } from "../constants";
import { useConfirmCheckout } from "../hooks/use-confirm-chekout";
import { formatRupiah } from "@/shared/utils/formatter";
import Link from "next/link";

type Props = {
  data: CheckoutSession;
  sessionId: number;
};

export function OrderSummary({ data, sessionId }: Props) {
  const hasShipping = !!data.courierCode;
  const confirmMutation = useConfirmCheckout();

  const isDisabled = !data.canPlaceOrder || confirmMutation.isPending;

  return (
    <div className="space-y-4 text-sm">
      <h2 className="text-sm font-medium">Order Summary</h2>

      {/* ITEMS COUNT */}
      <p className="text-xs text-muted-foreground">
        {data.items.length} item{data.items.length > 1 ? "s" : ""}
      </p>

      {/* PRICE */}
      <div className="space-y-2">
        {/* SUBTOTAL */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatRupiah(data.subtotal)}</span>
        </div>

        {/* SHIPPING */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>

            {hasShipping ? <span>{formatRupiah(data.shippingCost)}</span> : <span className="text-muted-foreground">Not selected</span>}
          </div>

          {/* COURIER INFO */}
          {hasShipping && (
            <p className="text-[11px] text-muted-foreground text-right leading-snug">
              {data.courierName} ({data.courierService}){data.shippingEtd && ` • ${data.shippingEtd}`}
            </p>
          )}
        </div>

        {/* TOTAL */}
        <div className="border-t pt-3 flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>{formatRupiah(data.total)}</span>
        </div>
      </div>

      {/* BUTTON */}
      <Button className="w-full" disabled={isDisabled} onClick={() => confirmMutation.mutate(sessionId)}>
        {confirmMutation.isPending ? "Processing..." : "Place Order"}
      </Button>

      {/* BLOCK REASON */}
      {!data.canPlaceOrder && data.reason && (
        <div className="space-y-2 text-center">
          <p className="text-xs text-destructive leading-snug">{reasonMap[data.reason]}</p>

          {data.reason === "INVALID_ITEMS" && (
            <Link href="/cart">
              <Button size="sm" variant="outline" className="w-full">
                Review Cart
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
