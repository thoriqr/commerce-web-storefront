import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { setShippingCheckoutSession } from "../api";
import { SetShippingPayload } from "../types";

export function useSetShipping(options?: UseMutationOptions<void, unknown, { sessionId: number; payload: SetShippingPayload }>) {
  return useMutation({
    mutationFn: ({ sessionId, payload }: { sessionId: number; payload: SetShippingPayload }) => setShippingCheckoutSession(sessionId, payload),
    ...options
  });
}
