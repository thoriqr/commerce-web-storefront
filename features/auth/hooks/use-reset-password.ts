import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPasswordConfirm } from "../api";
import { invalidateUserScope } from "@/shared/utils/invalidate";

export function useResetPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetPasswordConfirm,
    onSuccess: async (result) => {
      if (result.ok) {
        await invalidateUserScope(queryClient);
      }
    }
  });
}
