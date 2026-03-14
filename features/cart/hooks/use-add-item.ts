import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem } from "../api";
import { toast } from "sonner";

export function useAddItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cart-add"],
    mutationFn: addItem,

    onSuccess: async (result) => {
      if (!result.ok) {
        toast.error(result.error.message ?? "Failed to add cart", {
          position: "top-center"
        });
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: () => {
      toast.error("Failed to add cart", {
        position: "top-center"
      });
    }
  });
}
