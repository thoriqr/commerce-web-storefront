import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { setShippingCheckoutSession } from "../api";
import { SetShippingPayload } from "../types";
import { MUTATION_KEYS } from "../constants";

export function useSetShipping(options?: UseMutationOptions<void, unknown, { sessionId: number; payload: SetShippingPayload }>) {
  return useMutation({
    mutationKey: [MUTATION_KEYS.CHECKOUT_SET_SHIPPING],
    mutationFn: ({ sessionId, payload }: { sessionId: number; payload: SetShippingPayload }) => setShippingCheckoutSession(sessionId, payload),
    ...options
  });
}
