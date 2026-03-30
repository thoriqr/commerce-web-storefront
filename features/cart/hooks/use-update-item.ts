import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItem } from "../api";
import { toast } from "sonner";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cart-update"],
    mutationFn: updateItem,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.CART });
    },

    onError: () => {
      toast.error("Failed to update cart", {
        position: "top-center"
      });
    }
  });
}
