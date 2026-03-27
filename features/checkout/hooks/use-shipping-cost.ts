import { useMutation } from "@tanstack/react-query";
import { getShippingCost } from "../api";
import { useRouter } from "next/navigation";

import { handleCheckoutError } from "../util";

export function useShippingCost() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ sessionId, courier }: { sessionId: number; courier: string }) => getShippingCost(sessionId, courier),

    onError: (error) => handleCheckoutError(error, router)
  });
}
