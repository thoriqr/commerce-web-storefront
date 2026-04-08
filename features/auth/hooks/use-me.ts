import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";

export function useMe() {
  return useQuery({
    queryKey: USER_QUERY_KEYS.ME,
    queryFn: fetchMe,
    retry: false
  });
}
