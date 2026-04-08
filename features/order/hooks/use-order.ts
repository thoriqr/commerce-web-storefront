import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { getOrder } from "../api";

export function useOrder(orderCode: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, orderCode],
    queryFn: () => getOrder(orderCode),

    staleTime: 5 * 1000,
    gcTime: 5 * 60 * 1000,

    refetchOnWindowFocus: true,
    refetchOnMount: true,

    refetchInterval: (query) => {
      const data = query.state.data;

      if (!data) return false;

      const now = Date.now();
      const expiresAt = new Date(data.expiresAt).getTime();

      const isUnpaid = data.paymentStatus === "UNPAID";
      const notExpired = now < expiresAt;

      const shouldPoll = isUnpaid && notExpired && data.canPay;

      return shouldPoll ? 5000 : false;
    }
  });
}
