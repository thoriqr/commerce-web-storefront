import { Button } from "@/components/ui/button";
import { CheckoutSession } from "../types";
import { reasonMap } from "../constants";
import { useConfirmCheckout } from "../hooks/use-confirm-chekout";
import { formatRupiah } from "@/shared/utils/formatter";

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
      {!data.canPlaceOrder && data.reason && <p className="text-xs text-destructive text-center leading-snug">{reasonMap[data.reason]}</p>}
    </div>
  );
}
