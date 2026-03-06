import { useMutation } from "@tanstack/react-query";
import { changeEmailRequest } from "../api";

export function useChangeEmail() {
  return useMutation({
    mutationFn: changeEmailRequest
  });
}
