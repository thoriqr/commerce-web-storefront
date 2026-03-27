import { useQuery } from "@tanstack/react-query";
import { getCheckoutSession } from "../api";
import { QUERY_KEYS } from "../constants";

export function useCheckoutSession(sessionId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.CHECKOUT_SESSION, sessionId],
    queryFn: () => getCheckoutSession(sessionId),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });
}
