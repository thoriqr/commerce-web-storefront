import { useMutation } from "@tanstack/react-query";
import { createSnapToken } from "../api";
import { FetchError } from "@/shared/types/api-error";
import { toast } from "sonner";

export function useSnapToken() {
  return useMutation({
    mutationFn: createSnapToken,

    onError: (error) => {
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
