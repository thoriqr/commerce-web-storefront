import { useIsMutating } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../constants";

export function useCartMutations() {
  const isUpdating = useIsMutating({ mutationKey: [MUTATION_KEYS.CART_UPDATE] }) > 0;
  const isDeleting = useIsMutating({ mutationKey: [MUTATION_KEYS.CART_DELETE] }) > 0;
  const isAdding = useIsMutating({ mutationKey: [MUTATION_KEYS.CART_ADD] }) > 0;

  const isMutating = isUpdating || isDeleting || isAdding;

  return {
    isMutating,
    isUpdating,
    isDeleting,
    isAdding
  };
}
