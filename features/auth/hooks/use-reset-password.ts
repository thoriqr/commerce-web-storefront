import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { resetPasswordConfirm } from "../api";
import { ResetPasswordInput } from "../types";

export function useResetPassword(options?: UseMutationOptions<void, unknown, ResetPasswordInput>) {
  return useMutation({
    mutationFn: resetPasswordConfirm,
    ...options
  });
}
