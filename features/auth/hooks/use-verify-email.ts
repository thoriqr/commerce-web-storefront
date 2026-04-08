import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { verifyEmailConfirm } from "../api";
import { VerifyEmailInput } from "../types";

export function useVerifyEmail(options?: UseMutationOptions<void, unknown, VerifyEmailInput>) {
  return useMutation({
    mutationFn: verifyEmailConfirm,
    ...options
  });
}
