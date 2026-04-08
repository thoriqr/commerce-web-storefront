import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { logoutRequest } from "../api";

export function useLogout(options?: UseMutationOptions<void, unknown>) {
  return useMutation({
    mutationFn: logoutRequest,
    ...options
  });
}
