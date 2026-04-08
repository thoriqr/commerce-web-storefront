import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { resetPasswordRequest } from "../api";
import { RegisterInput } from "../types";

export function usePasswordResetRequest(options?: UseMutationOptions<void, unknown, RegisterInput>) {
  return useMutation({
    mutationFn: resetPasswordRequest,
    ...options
  });
}
