import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { getOrders } from "../api";
import { OrderListingQueryParams } from "../types";

export function useOrders(params?: OrderListingQueryParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS, params],
    queryFn: () => getOrders(params),
    placeholderData: keepPreviousData
  });
}
