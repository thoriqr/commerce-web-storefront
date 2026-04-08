import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { updateAddress } from "../api";
import { UpsertAddressPayload } from "../types";

type UpdateAddressPayload = {
  addressId: number;
  payload: UpsertAddressPayload;
};

export function useUpdateAddress(options?: UseMutationOptions<void, unknown, UpdateAddressPayload>) {
  return useMutation({
    mutationFn: ({ addressId, payload }: UpdateAddressPayload) => updateAddress(addressId, payload),
    ...options
  });
}
