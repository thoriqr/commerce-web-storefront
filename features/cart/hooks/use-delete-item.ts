import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "../api";
import { toast } from "sonner";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";
import { FetchError } from "@/shared/types/api-error";

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cart-delete"],
    mutationFn: deleteItem,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.CART });
    },

    onError: (err) => {
      if (err instanceof FetchError) {
        toast.error("Failed to delete item", {
          description: err.message
        });
        return;
      }

      toast.error("Something went wrong");
    }
  });
}
