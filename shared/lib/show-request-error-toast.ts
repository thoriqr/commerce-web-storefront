import { toast } from "sonner";
import { FetchError } from "../types/api-error";

export function showRequestErrorToast(error: unknown, fallbackMessage = "Request failed") {
  if (error instanceof FetchError) {
    toast.error(fallbackMessage, {
      description: error.message,
      duration: 5000
    });

    return;
  }

  toast.error("Something went wrong", {
    duration: 5000
  });
}
