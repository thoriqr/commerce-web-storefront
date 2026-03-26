import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setPasswordRequest } from "../api";
import { invalidateUserScope } from "@/shared/utils/invalidate";

export function useSetPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setPasswordRequest,
    onSuccess: async (result) => {
      if (result.ok) {
        await invalidateUserScope(queryClient);
      }
    }
  });
}
