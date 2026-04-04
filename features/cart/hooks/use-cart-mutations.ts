import { useIsMutating } from "@tanstack/react-query";

export function useCartMutations() {
  const isUpdating = useIsMutating({ mutationKey: ["cart-update"] }) > 0;
  const isDeleting = useIsMutating({ mutationKey: ["cart-delete"] }) > 0;
  const isAdding = useIsMutating({ mutationKey: ["cart-add"] }) > 0;

  const isMutating = isUpdating || isDeleting || isAdding;

  return {
    isMutating,
    isUpdating,
    isDeleting,
    isAdding
  };
}
