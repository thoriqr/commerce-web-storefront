import { cancelOrder } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FetchError } from "@/shared/types/api-error";
import { toast } from "sonner";
import { QUERY_KEYS } from "../constants";

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,

    onSuccess: (_, orderCode) => {
      toast.success("Order cancelled");

      // refetch order
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDER, orderCode]
      });
    },

    onError: (error) => {
      if (error instanceof FetchError) {
        // generic API error
        toast.error("Request failed", {
          description: error.message,
          duration: 5000
        });

        return;
      }

      // fallback
      toast.error("Something went wrong", {
        duration: 5000
      });
    }
  });
}
