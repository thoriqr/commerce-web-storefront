import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { createAddress } from "../api";
import { CreateAddressResult, UpsertAddressPayload } from "../types";

export function useCreateAddress(options?: UseMutationOptions<CreateAddressResult, unknown, UpsertAddressPayload>) {
  return useMutation({
    mutationFn: createAddress,
    ...options
  });
}
