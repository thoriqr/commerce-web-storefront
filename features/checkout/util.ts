import { FetchError } from "@/shared/types/api-error";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export function handleCheckoutError(error: unknown, router?: AppRouterInstance) {
  if (error instanceof FetchError) {
    // (redirect)
    if (error.status === 404) {
      toast.error("Session not found or expired");
      router?.replace("/");
      return;
    }

    toast.error(error.message || "Request failed", {
      duration: 5000
    });

    return;
  }

  toast.error("Something went wrong", {
    duration: 5000
  });
}
