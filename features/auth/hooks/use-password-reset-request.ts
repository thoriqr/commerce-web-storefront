import { useMutation } from "@tanstack/react-query";
import { resetPasswordRequest } from "../api";

export function usePasswordResetRequest() {
  return useMutation({
    mutationFn: resetPasswordRequest
  });
}
