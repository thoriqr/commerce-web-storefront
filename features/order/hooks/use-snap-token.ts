import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSnapToken } from "../api";
import { FetchError } from "@/shared/types/api-error";
import { toast } from "sonner";
import { handleSessionError } from "@/shared/lib/session-error";

export function useSnapToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSnapToken,

    onError: (error) => {
      if (handleSessionError(error, queryClient)) {
        return;
      }

      if (error instanceof FetchError) {
        toast.error("Failed to initiate payment", {
          description: error.message,
          duration: 5000
        });
        return;
      }

      toast.error("Something went wrong", {
        duration: 5000
      });
    }
  });
}
