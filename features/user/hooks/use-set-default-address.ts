import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setDefaultAddress } from "../api";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";
import { QUERY_KEYS } from "../constants";
import { FetchError } from "@/shared/types/api-error";
import { toast } from "sonner";

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setDefaultAddress,

    onSuccess: (_, addressId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADDRESS, addressId]
      });

      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.USER_PROFILE
      });

      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.ADDRESSES
      });
    },
    onError: (err) => {
      if (err instanceof FetchError) {
        toast.error("Set address failed", {
          description: err.message
        });
        return;
      }

      toast.error("Something went wrong");
    }
  });
}
