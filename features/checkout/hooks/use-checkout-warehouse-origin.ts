import { useQuery } from "@tanstack/react-query";
import { getWarehouseOrigin } from "../api";

export function useCheckoutWarehouseOrigin() {
  return useQuery({
    queryKey: ["warehouse-origin"],
    queryFn: () => getWarehouseOrigin()
  });
}
