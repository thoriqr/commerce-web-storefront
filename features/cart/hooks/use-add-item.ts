import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem } from "../api";
import { toast } from "sonner";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";

export function useAddItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cart-add"],
    mutationFn: addItem,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.CART });
    },

    onError: () => {
      toast.error("Failed to add cart", {
        position: "top-center"
      });
    }
  });
}
