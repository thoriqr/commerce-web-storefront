import { useMutation, useQueryClient } from "@tanstack/react-query";
import { googleLoginRequest } from "../api";
import { invalidateUserScope } from "@/shared/utils/invalidate";

export function useGoogleLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: googleLoginRequest,
    onSuccess: async () => {
      await invalidateUserScope(queryClient);
    }
  });
}
