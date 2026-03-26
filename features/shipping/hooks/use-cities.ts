import { useQuery } from "@tanstack/react-query";
import { getCities } from "../api";

export function useCities(provinceId?: number) {
  return useQuery({
    queryKey: ["cities", provinceId],
    queryFn: () => getCities(provinceId!),
    enabled: typeof provinceId === "number"
  });
}
