"use client";

import { Button } from "@/components/ui/button";
import { useCreateCheckoutSession } from "@/features/checkout/hooks/use-create-checkout-session";
import { CartItem, CartSummary as Summary } from "../types";
import { formatRupiah } from "@/shared/utils/formatter";
import { useRouter } from "next/navigation";
import { FetchError } from "@/shared/types/api-error";
import { toast } from "sonner";
import { useMe } from "@/features/auth/hooks/use-me";

type Props = {
  summary: Summary;
  isMutating: boolean;
  items: CartItem[];
};
export default function CartSummary({ summary, isMutating, items }: Props) {
  const router = useRouter();

  const { data: user } = useMe();

  const confirmMutation = useCreateCheckoutSession({
    onSuccess: (data) => {
      router.push(`/checkout/${data.sessionId}`);
    },
    onError: (err) => {
      if (err instanceof FetchError) {
        toast.error("Checkout failed", {
          description: err.message
        });
        return;
      }

      toast.error("Something went wrong", {
        description: "Please try again later."
      });
    }
  });

  const hasUnavailable = items.some((i) => i.warning === "UNAVAILABLE");
  const hasOutOfStock = items.some((i) => i.warning === "OUT_OF_STOCK");
  const hasInsufficient = items.some((i) => i.warning === "INSUFFICIENT_STOCK");

  const disableCheckout = isMutating || hasUnavailable || hasOutOfStock || hasInsufficient;

  let message: string | null = null;

  if (hasUnavailable) {
    message = "Remove unavailable items before checkout.";
  } else if (hasOutOfStock) {
    message = "Some items are out of stock.";
  } else if (hasInsufficient) {
    message = "Adjust item quantities before checkout.";
  }

  return (
    <div className="sticky bottom-0 border-t bg-background px-5 py-4">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span className="font-medium">{formatRupiah(summary.subtotal)}</span>
      </div>

      <Button
        className="mt-4 w-full"
        disabled={disableCheckout || confirmMutation.isPending}
        onClick={() => {
          if (!user) {
            router.push("/login?redirect=/cart");
            return;
          }

          confirmMutation.mutate();
        }}
      >
        {confirmMutation.isPending ? "Processing..." : "Checkout"}
      </Button>

      {message && <p className="text-xs text-destructive mt-2 text-center">{message}</p>}
    </div>
  );
}
