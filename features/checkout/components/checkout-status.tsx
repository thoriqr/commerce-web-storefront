import { reasonMap } from "../constants";
import { CheckoutBlockReason } from "../types";

type Props = {
  canPlaceOrder: boolean;
  reason: CheckoutBlockReason | null;
};

export function CheckoutStatus({ canPlaceOrder, reason }: Props) {
  if (canPlaceOrder) return null;

  return (
    <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
      <p className="font-medium">Action required</p>
      <p className="text-xs mt-1">{reason ? reasonMap[reason] : "Something went wrong."}</p>
    </div>
  );
}
