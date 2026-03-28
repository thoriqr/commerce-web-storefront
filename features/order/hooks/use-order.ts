import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { getOrder } from "../api";

export function useOrder(orderCode: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, orderCode],
    queryFn: () => getOrder(orderCode),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });
}
