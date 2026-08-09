import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { createCheckoutSession } from "../api";
import { MUTATION_KEYS } from "../constants";

export function useCreateCheckoutSession(options?: UseMutationOptions<{ sessionId: number }, unknown>) {
  return useMutation({
    mutationKey: [MUTATION_KEYS.CHECKOUT_CREATE],
    mutationFn: createCheckoutSession,
    ...options
  });
}
