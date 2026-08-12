import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItem } from "../api";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";
import { MUTATION_KEYS } from "../constants";
import { handleSessionError } from "@/shared/lib/session-error";
import { showRequestErrorToast } from "@/shared/lib/show-request-error-toast";

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.CART_UPDATE],
    mutationFn: updateItem,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.CART });
    },

    onError: (err) => {
      if (handleSessionError(err, queryClient)) {
        return;
      }

      showRequestErrorToast(err, "Failed to update item");
    }
  });
}
