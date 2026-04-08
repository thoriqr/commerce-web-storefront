import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { createCheckoutSession } from "../api";

export function useCreateCheckoutSession(options?: UseMutationOptions<{ sessionId: number }, unknown>) {
  return useMutation({
    mutationFn: createCheckoutSession,
    ...options
  });
}
