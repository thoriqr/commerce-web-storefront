import { useQuery } from "@tanstack/react-query";
import { getAddress } from "../api";
import { QUERY_KEYS } from "../constants";

export function useAddress(addressId: number | null) {
  return useQuery({
    queryKey: [QUERY_KEYS.ADDRESS, addressId],
    queryFn: () => getAddress(addressId!),
    enabled: typeof addressId === "number"
  });
}
