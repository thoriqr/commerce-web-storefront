import { QueryClient } from "@tanstack/react-query";
import { USER_QUERY_KEYS } from "../constants/query-keys";

export function invalidateUserScope(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.ME });
  queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.CART });
  queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.ADDRESSES });
  queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.USER_PROFILE });
}

export function clearUserScope(queryClient: QueryClient) {
  queryClient.removeQueries({ queryKey: USER_QUERY_KEYS.ME });
  queryClient.removeQueries({ queryKey: USER_QUERY_KEYS.CART });
  queryClient.removeQueries({ queryKey: USER_QUERY_KEYS.ADDRESSES });
  queryClient.removeQueries({ queryKey: USER_QUERY_KEYS.USER_PROFILE });
}
