import { useQuery } from "@tanstack/react-query";
import { getUserAddresses } from "../api";
import { QUERY_KEYS } from "../constants";

export function useAddresses() {
  return useQuery({
    queryKey: [QUERY_KEYS.ADDRESSES],
    queryFn: getUserAddresses
  });
}
