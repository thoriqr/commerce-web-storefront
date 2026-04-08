import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "../api";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";
import { QUERY_KEYS } from "../constants";
import { toast } from "sonner";

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
    onError: () => {
      toast.error("Cannot delete address");
    }
  });
}
