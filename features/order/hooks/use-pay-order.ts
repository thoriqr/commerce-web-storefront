import { toast } from "sonner";
import { useSnapToken } from "./use-snap-token";

export function usePayOrder(orderCode: string, refetch: () => void) {
  const snapMutation = useSnapToken();

  const handlePay = async () => {
    if (!window.snap) {
      toast.error("Payment system not ready");
      return;
    }

    try {
      const res = await snapMutation.mutateAsync(orderCode);

      window.snap.pay(res.token, {
        onSuccess: () => {
          refetch(); // update from webhook
        },

        onPending: () => {
          toast.message("Waiting for your payment...");
        },

        onError: () => {
          toast.error("Payment failed. Please try again.");
        },

        onClose: () => {
          toast.message("Payment cancelled");
        }
      });
    } catch {
      // error already handled in mutation
    }
  };

  return {
    handlePay,
    isLoading: snapMutation.isPending
  };
}
