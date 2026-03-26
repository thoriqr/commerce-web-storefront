import { QueryClient } from "@tanstack/react-query";
import { USER_QUERY_KEYS } from "../constants/query-keys";

export async function invalidateUserScope(queryClient: QueryClient) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.ME }),
    queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.CART }),
    queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.ADDRESSES }),
    queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.USER_PROFILE })
  ]);
}
