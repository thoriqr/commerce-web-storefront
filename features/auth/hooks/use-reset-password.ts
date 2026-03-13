import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPasswordConfirm } from "../api";

export function useResetPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetPasswordConfirm,
    onSuccess: async (result) => {
      if (result.ok) {
        await Promise.all([queryClient.invalidateQueries({ queryKey: ["me"] }), queryClient.invalidateQueries({ queryKey: ["cart"] })]);
      }
    }
  });
}
