import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createCheckoutSession } from "../api";
import { FetchError } from "@/shared/types/api-error";
import { toast } from "sonner";

export function useCreateCheckoutSession() {
  const router = useRouter();

  return useMutation({
    mutationFn: createCheckoutSession,

    onSuccess: (data) => {
      router.push(`/checkout/${data.sessionId}`);
    },

    onError: (error) => {
      if (error instanceof FetchError) {
        toast.error("Checkout failed", {
          description: error.message
        });
        return;
      }

      toast.error("Something went wrong", {
        description: "Please try again later."
      });
    }
  });
}
