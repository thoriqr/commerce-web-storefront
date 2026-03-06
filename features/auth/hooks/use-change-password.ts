import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePasswordRequest } from "../api";

export function useChangePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePasswordRequest,
    onSuccess: async (result) => {
      if (result.ok) {
        await queryClient.invalidateQueries({ queryKey: ["me"] });
      }
    }
  });
}
