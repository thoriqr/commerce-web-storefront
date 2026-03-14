import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItem } from "../api";
import { toast } from "sonner";

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cart-update"],
    mutationFn: updateItem,

    onSuccess: async (result) => {
      if (!result.ok) {
        toast.error(result.error.message ?? "Failed to update cart", {
          position: "top-center"
        });
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: () => {
      toast.error("Failed to update cart", {
        position: "top-center"
      });
    }
  });
}
