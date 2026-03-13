import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setPasswordRequest } from "../api";

export function useSetPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setPasswordRequest,
    onSuccess: async (result) => {
      if (result.ok) {
        await Promise.all([queryClient.invalidateQueries({ queryKey: ["me"] }), queryClient.invalidateQueries({ queryKey: ["cart"] })]);
      }
    }
  });
}
