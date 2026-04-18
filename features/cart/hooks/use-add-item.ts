import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem } from "../api";
import { toast } from "sonner";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";
import { FetchError } from "@/shared/types/api-error";

export function useAddItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cart-add"],
    mutationFn: addItem,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.CART });
    },

    onError: (err) => {
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
