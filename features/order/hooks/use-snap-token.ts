import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSnapToken } from "../api";
import { handleSessionError } from "@/shared/lib/session-error";
import { showRequestErrorToast } from "@/shared/lib/show-request-error-toast";

export function useSnapToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSnapToken,

    onError: (error) => {
      if (handleSessionError(error, queryClient)) {
        return;
      }

      showRequestErrorToast(error, "Failed to initiate payment");
    }
  });
}
