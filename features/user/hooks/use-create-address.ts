import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAddress } from "../api";
import { QUERY_KEYS } from "../constants";

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddress,
    onSuccess: async (result) => {
      if (result.ok) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADDRESSES] });
      }
    }
  });
}
