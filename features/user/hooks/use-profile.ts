import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";

export function useProfile() {
  return useQuery({
    queryKey: USER_QUERY_KEYS.USER_PROFILE,
    queryFn: getUserProfile
  });
}
