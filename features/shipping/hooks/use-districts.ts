import { useQuery } from "@tanstack/react-query";
import { getDistricts } from "../api";

export function useDistricts(cityId?: number) {
  return useQuery({
    queryKey: ["districts", cityId],
    queryFn: () => getDistricts(cityId!),
    enabled: typeof cityId === "number"
  });
}
