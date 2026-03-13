import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePasswordRequest } from "../api";

export function useChangePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePasswordRequest,
    onSuccess: async (result) => {
      if (result.ok) {
        await Promise.all([queryClient.invalidateQueries({ queryKey: ["me"] }), queryClient.invalidateQueries({ queryKey: ["cart"] })]);
      }
    }
  });
}
