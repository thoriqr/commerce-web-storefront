import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { setAddressCheckoutSession } from "../api";
import { handleCheckoutError } from "../util";
import { QUERY_KEYS } from "../constants";

export function useSetAddress() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ sessionId, addressId }: { sessionId: number; addressId: number }) => setAddressCheckoutSession(sessionId, addressId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHECKOUT_SESSION, variables.sessionId]
      });
    },
    onError: (error) => handleCheckoutError(error, router)
  });
}
