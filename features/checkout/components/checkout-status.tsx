import { reasonMap } from "../constants";
import { CheckoutBlockReason } from "../types";

type Props = {
  canPlaceOrder: boolean;
  reason: CheckoutBlockReason | null;
};

export function CheckoutStatus({ canPlaceOrder, reason }: Props) {
  if (canPlaceOrder) return null;

  return (
    <div className="border border-destructive/30 bg-destructive/10 text-destructive rounded-md p-3 text-sm">
      {reason ? reasonMap[reason] : "Something went wrong."}
    </div>
  );
}
