import { useMutation } from "@tanstack/react-query";
import { getShippingCost } from "../api";

export function useShippingCost() {
  return useMutation({
    mutationFn: ({ sessionId, courier }: { sessionId: number; courier: string }) => getShippingCost(sessionId, courier)
  });
}
