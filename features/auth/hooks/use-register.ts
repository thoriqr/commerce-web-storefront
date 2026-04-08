import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { registerRequest } from "../api";

export function useRegister(options?: UseMutationOptions<void, unknown, { email: string }>) {
  return useMutation({
    mutationFn: registerRequest,
    ...options
  });
}
