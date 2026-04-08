import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { googleLoginRequest } from "../api";

export function useGoogleLogin(options?: UseMutationOptions<void, unknown, string>) {
  return useMutation({
    mutationFn: googleLoginRequest,
    ...options
  });
}
