import { confirmCheckout } from "../api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useConfirmCheckout(options?: UseMutationOptions<{ orderCode: string }, unknown, number>) {
  return useMutation({
    mutationFn: (sessionId) => confirmCheckout(sessionId),
    ...options
  });
}
