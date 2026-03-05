import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyEmailConfirm } from "../api";

export function useVerifyEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyEmailConfirm,
    onSuccess: async (result) => {
      if (result.ok) {
        await queryClient.invalidateQueries({ queryKey: ["me"] });
      }
    }
  });
}
