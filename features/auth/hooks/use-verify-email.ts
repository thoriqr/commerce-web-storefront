import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyEmailConfirm } from "../api";
import { invalidateUserScope } from "@/shared/utils/invalidate";

export function useVerifyEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyEmailConfirm,
    onSuccess: async (result) => {
      if (result.ok) {
        await invalidateUserScope(queryClient);
      }
    }
  });
}
