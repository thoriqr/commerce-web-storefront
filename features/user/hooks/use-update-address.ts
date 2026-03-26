import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAddress } from "../api";
import { UpsertAddressPayload } from "../types";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";
import { QUERY_KEYS } from "../constants";

type UpdateAddressPayload = {
  addressId: number;
  payload: UpsertAddressPayload;
};

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ addressId, payload }: UpdateAddressPayload) => updateAddress(addressId, payload),

    onSuccess: async (result, variables) => {
      if (result.ok) {
        const { addressId } = variables;

        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.ADDRESS, addressId]
          }),

          queryClient.invalidateQueries({
            queryKey: USER_QUERY_KEYS.USER_PROFILE
          }),

          queryClient.invalidateQueries({
            queryKey: USER_QUERY_KEYS.ADDRESSES
          })
        ]);
      }
    }
  });
}
