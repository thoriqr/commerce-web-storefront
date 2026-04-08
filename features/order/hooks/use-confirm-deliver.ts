import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { confirmDelivered } from "../api";

export function useConfirmDeliver(options?: UseMutationOptions<void, unknown, string>) {
  return useMutation({
    mutationFn: confirmDelivered,
    ...options
  });
}
