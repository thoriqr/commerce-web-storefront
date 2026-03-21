import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api";

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: true
  });
}
