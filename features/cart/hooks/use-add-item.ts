import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem } from "../api";
import { toast } from "sonner";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";
import { FetchError } from "@/shared/types/api-error";
import { MUTATION_KEYS } from "../constants";
import { handleSessionError } from "@/shared/lib/session-error";

export function useAddItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.CART_ADD],
    mutationFn: addItem,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.CART });
    },

    onError: (err) => {
      if (handleSessionError(err, queryClient)) {
        return;
      }

      if (err instanceof FetchError) {
        toast.error("Failed to add cart", {
          description: err.message
        });
        return;
      }

      toast.error("Something went wrong");
    }
  });
}
