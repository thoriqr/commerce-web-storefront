import { FetchError } from "@/shared/types/api-error";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export function handleCheckoutError(error: unknown, router?: AppRouterInstance) {
  if (error instanceof FetchError) {
    // expired / invalid session
    if (error.status === 404 || error.status === 400) {
      toast.error("Session expired", {
        description: "Your checkout session has expired.",
        duration: 5000
      });

      router?.replace("/");
      return;
    }

    // generic API error
    toast.error("Request failed", {
      description: error.message,
      duration: 5000
    });

    return;
  }

  // fallback
  toast.error("Something went wrong", {
    duration: 5000
  });
}
