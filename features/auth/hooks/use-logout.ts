import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutRequest } from "../api";
import { invalidateUserScope } from "@/shared/utils/invalidate";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: async () => {
      await invalidateUserScope(queryClient);
    }
  });
}
