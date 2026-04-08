import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { createAddress } from "../api";
import { UpsertAddressPayload } from "../types";

export function useCreateAddress(options?: UseMutationOptions<void, unknown, UpsertAddressPayload>) {
  return useMutation({
    mutationFn: createAddress,
    ...options
  });
}
