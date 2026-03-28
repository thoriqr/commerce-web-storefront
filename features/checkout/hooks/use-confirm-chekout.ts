import { useRouter } from "next/navigation";
import { confirmCheckout } from "../api";
import { useMutation } from "@tanstack/react-query";
import { handleCheckoutError } from "../util";

export function useConfirmCheckout() {
  const router = useRouter();

  return useMutation({
    mutationFn: confirmCheckout,

    onSuccess: (data) => {
      router.replace(`/order/${data.orderCode}`);
    },

    onError: (error) => handleCheckoutError(error, router)
  });
}
