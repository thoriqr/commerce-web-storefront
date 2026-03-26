import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api";
import { QUERY_KEYS } from "../constants";

export function useProfile() {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE],
    queryFn: getUserProfile,
    staleTime: 0
  });
}
