import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api";

export function useProfile() {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    staleTime: 0
  });
}
