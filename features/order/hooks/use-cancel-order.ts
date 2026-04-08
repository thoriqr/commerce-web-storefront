import { cancelOrder } from "../api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useCancelOrder(options?: UseMutationOptions<void, unknown, string>) {
  return useMutation({
    mutationFn: cancelOrder,
    ...options
  });
}
