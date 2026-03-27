import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setShippingCheckoutSession } from "../api";
import { SetShippingPayload } from "../types";
import { QUERY_KEYS } from "../constants";
import { handleCheckoutError } from "../util";
import { useRouter } from "next/navigation";

export function useSetShipping() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ sessionId, payload }: { sessionId: number; payload: SetShippingPayload }) => setShippingCheckoutSession(sessionId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHECKOUT_SESSION, variables.sessionId]
      });
    },
    onError: (error) => handleCheckoutError(error, router)
  });
}
