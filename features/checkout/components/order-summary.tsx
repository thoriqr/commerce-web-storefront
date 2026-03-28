import { Button } from "@/components/ui/button";
import { CheckoutSession } from "../types";
import { reasonMap } from "../constants";
import { useConfirmCheckout } from "../hooks/use-confirm-chekout";

type Props = {
  data: CheckoutSession;
  sessionId: number;
};

export function OrderSummary({ data, sessionId }: Props) {
  const hasShipping = !!data.courierCode;
  const confirmMutation = useConfirmCheckout();

  return (
    <div className="rounded-md space-y-4">
      <h2 className="text-sm font-medium">Order Summary</h2>

      {/* ITEMS COUNT */}
      <p className="text-sm text-muted-foreground">{data.items.length} items</p>

      {/* PRICE */}
      <div className="space-y-2 text-sm">
        {/* SUBTOTAL */}
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rp {data.subtotal.toLocaleString("id-ID")}</span>
        </div>

        {/* SHIPPING RESULT */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Shipping</span>

            {hasShipping ? <span>Rp {data.shippingCost.toLocaleString("id-ID")}</span> : <span className="text-muted-foreground">Not selected</span>}
          </div>

          {/* COURIER INFO */}
          {hasShipping && (
            <p className="text-xs text-muted-foreground text-right">
              {data.courierName} ({data.courierService}){data.shippingEtd && ` • ${data.shippingEtd} `}
            </p>
          )}
        </div>

        {/* TOTAL */}
        <div className="border-t pt-2 flex justify-between font-medium">
          <span>Total</span>
          <span>Rp {data.total.toLocaleString("id-ID")}</span>
        </div>
      </div>

      {/* BUTTON */}
      <Button className="w-full" disabled={!data.canPlaceOrder || confirmMutation.isPending} onClick={() => confirmMutation.mutate(sessionId)}>
        {confirmMutation.isPending ? "Processing..." : "Place Order"}
      </Button>

      {/* BLOCK REASON */}
      {!data.canPlaceOrder && data.reason && <p className="text-xs text-destructive text-center">{reasonMap[data.reason]}</p>}
    </div>
  );
}
