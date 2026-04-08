import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { getShippingCost } from "../api";
import { ShippingCost } from "../types";

export function useShippingCost(options?: UseMutationOptions<ShippingCost, unknown, { sessionId: number; courier: string }>) {
  return useMutation({
    mutationFn: ({ sessionId, courier }: { sessionId: number; courier: string }) => getShippingCost(sessionId, courier),
    ...options
  });
}
