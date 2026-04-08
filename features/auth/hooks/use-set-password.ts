import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { setPasswordRequest } from "../api";
import { SetPasswordInput } from "../types";

export function useSetPassword(options?: UseMutationOptions<void, unknown, SetPasswordInput>) {
  return useMutation({
    mutationFn: setPasswordRequest,
    ...options
  });
}
