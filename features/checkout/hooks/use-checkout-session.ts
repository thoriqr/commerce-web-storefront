import { useQuery } from "@tanstack/react-query";
import { getCheckoutSession } from "../api";
import { QUERY_KEYS } from "../constants";

export function useCheckoutSession(sessionId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.CHECKOUT_SESSION, sessionId],
    queryFn: () => getCheckoutSession(sessionId),

    staleTime: 5 * 1000,
    gcTime: 5 * 60 * 1000,

    refetchOnWindowFocus: true,
    refetchOnMount: true,

    refetchInterval: (query) => {
      const data = query.state.data;

      if (!data) return false;

      const now = Date.now();
      const expiresAt = new Date(data.expiresAt).getTime();

      return now < expiresAt ? 5000 : false;
    }
  });
}
