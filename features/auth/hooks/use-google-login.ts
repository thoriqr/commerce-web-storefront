import { useMutation, useQueryClient } from "@tanstack/react-query";
import { googleLoginRequest } from "../api";

export function useGoogleLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: googleLoginRequest,
    onSuccess: async (result) => {
      if (result.ok) {
        await queryClient.invalidateQueries({ queryKey: ["me"] });
      }
    }
  });
}
