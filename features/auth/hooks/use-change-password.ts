import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePasswordRequest } from "../api";
import { invalidateUserScope } from "@/shared/utils/invalidate";

export function useChangePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePasswordRequest,
    onSuccess: async () => {
      await invalidateUserScope(queryClient);
    }
  });
}
