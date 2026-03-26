import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginRequest } from "../api";
import { invalidateUserScope } from "@/shared/utils/invalidate";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: async (result) => {
      if (result.ok) {
        await invalidateUserScope(queryClient);
      }
    }
  });
}
