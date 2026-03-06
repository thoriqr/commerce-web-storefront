import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmEmailChange } from "../api";

export function useConfirmEmailChange() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmEmailChange,
    onSuccess: async (result) => {
      if (result.ok) {
        await queryClient.invalidateQueries({ queryKey: ["me"] });
      }
    }
  });
}
