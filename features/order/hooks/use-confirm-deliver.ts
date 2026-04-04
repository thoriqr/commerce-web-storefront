import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmDelivered } from "../api";
import { QUERY_KEYS } from "../constants";
import { FetchError } from "@/shared/types/api-error";
import { toast } from "sonner";

export function useConfirmDeliver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmDelivered,

    onSuccess: (_, orderCode) => {
      // refetch order
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDER, orderCode]
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDERS]
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
