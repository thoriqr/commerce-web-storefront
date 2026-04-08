import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setDefaultAddress } from "../api";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";
import { QUERY_KEYS } from "../constants";

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setDefaultAddress,

    onSuccess: (_, addressId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADDRESS, addressId]
      });

      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.USER_PROFILE
      });

      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.ADDRESSES
      });
    }
  });
}
