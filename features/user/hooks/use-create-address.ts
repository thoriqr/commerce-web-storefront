import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAddress } from "../api";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddress,
    onSuccess: async (result) => {
      if (result.ok) {
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.ADDRESSES });
      }
    }
  });
}
