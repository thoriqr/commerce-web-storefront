import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";

export function useCart() {
  return useQuery({
    queryKey: USER_QUERY_KEYS.CART,
    queryFn: getCart,
    retry: false
  });
}
