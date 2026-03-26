import { useQuery } from "@tanstack/react-query";
import { getUserAddresses } from "../api";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";

export function useAddresses() {
  return useQuery({
    queryKey: USER_QUERY_KEYS.ADDRESSES,
    queryFn: getUserAddresses
  });
}
