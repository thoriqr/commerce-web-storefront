import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { loginRequest } from "../api";
import { LoginFormSchema } from "../components/schema";

export function useLogin(options?: UseMutationOptions<void, unknown, LoginFormSchema>) {
  return useMutation({
    mutationFn: loginRequest,
    ...options
  });
}
