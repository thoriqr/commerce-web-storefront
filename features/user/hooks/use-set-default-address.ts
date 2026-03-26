import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setDefaultAddress } from "../api";
import { QUERY_KEYS } from "../constants";

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setDefaultAddress,

    onSuccess: async (result, addressId) => {
      if (result.ok) {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.USER_PROFILE]
          }),
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.ADDRESS, addressId]
          }),
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.ADDRESSES]
          })
        ]);
      }
    }
  });
}
