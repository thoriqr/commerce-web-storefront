import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "../api";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";
import { QUERY_KEYS } from "../constants";
import { toast } from "sonner";
import { FetchError } from "@/shared/types/api-error";

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,

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
        toast.error("Delete address failed", {
          description: err.message
        });
        return;
      }

      toast.error("Something went wrong");
    }
  });
}
