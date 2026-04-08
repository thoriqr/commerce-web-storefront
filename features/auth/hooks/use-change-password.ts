import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { changePasswordRequest } from "../api";
import { ChangePasswordInput } from "../types";

export function useChangePassword(options?: UseMutationOptions<void, unknown, ChangePasswordInput>) {
  return useMutation({
    mutationFn: changePasswordRequest,
    ...options
  });
}
