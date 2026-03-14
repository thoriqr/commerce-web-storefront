import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "../api";
import { toast } from "sonner";

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cart-delete"],
    mutationFn: deleteItem,

    onSuccess: async (result) => {
      if (!result.ok) {
        toast.error(result.error.message ?? "Failed to delete item", {
          position: "top-center"
        });
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: () => {
      toast.error("Failed to delete item", {
        position: "top-center"
      });
    }
  });
}
