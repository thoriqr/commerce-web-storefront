import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: async (result) => {
      if (result.ok) {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: USER_QUERY_KEYS.USER_PROFILE
          }),

          queryClient.invalidateQueries({
            queryKey: USER_QUERY_KEYS.ME
          })
        ]);
      }
    }
  });
}
