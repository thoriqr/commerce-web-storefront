import { useCartMutations } from "../../hooks/use-cart-mutations";
import { Cart } from "../../types";
import CartItemRow from "../cart-item-row";
import CartSummary from "../cart-summary";
import CartSkeleton from "./cart-content-skeleton";

type Props = {
  isLoading: boolean;
  data: Cart | undefined;
  onClose: () => void;
};

export default function CartContent({ data, isLoading, onClose }: Props) {
  const { isMutating } = useCartMutations();

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (!data) {
    return <div className="py-10 px-5 text-center text-sm text-muted-foreground">Failed to load cart.</div>;
  }

  const cart = data;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-muted-foreground">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Scrollable items */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 pb-28">
        {cart.items.map((item) => (
          <CartItemRow key={item.variantId} item={item} onClose={onClose} />
        ))}
      </div>

      {/* Sticky summary */}
      <CartSummary summary={data.summary} isMutating={isMutating} items={data.items} />
    </div>
  );
}
