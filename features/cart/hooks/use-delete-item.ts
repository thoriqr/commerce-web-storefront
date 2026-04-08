import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "../api";
import { toast } from "sonner";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cart-delete"],
    mutationFn: deleteItem,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.CART });
    },

    onError: () => {
      toast.error("Failed to delete item", {
        position: "top-center"
      });
    }
  });
}
