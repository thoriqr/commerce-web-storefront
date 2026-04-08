import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { setAddressCheckoutSession } from "../api";
import { SetAddressCheckout } from "../types";

export function useSetAddress(options?: UseMutationOptions<void, unknown, SetAddressCheckout>) {
  return useMutation({
    mutationFn: ({ sessionId, addressId }: SetAddressCheckout) => setAddressCheckoutSession(sessionId, addressId),
    ...options
  });
}
