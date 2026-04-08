import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { updateProfile } from "../api";

export function useUpdateProfile(options?: UseMutationOptions<void, unknown, string>) {
  return useMutation({
    mutationFn: updateProfile,
    ...options
  });
}
