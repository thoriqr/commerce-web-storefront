"use client";

import { useCart } from "../hooks/use-cart";
import CartItemRow from "./cart-item-row";
import CartSummary from "./cart-summary";
import { useCartMutations } from "../hooks/use-cart-mutations";
import { SectionCard } from "@/components/section-card";
import CartViewSkeleton from "./cart-view-skeleton";
import { CartEmpty } from "./cart-empty";

export default function CartView() {
  const { data, isLoading } = useCart();
  const { isMutating } = useCartMutations();

  if (isLoading) {
    return <CartViewSkeleton />;
  }

  if (!data || data.items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-6">
      <h1 className="text-lg font-semibold">Shopping Cart</h1>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_320px]">
        {/* LEFT */}
        <div className="space-y-4 sm:space-y-6">
          <SectionCard>
            <div className="space-y-4">
              <h2 className="text-sm font-medium">Items</h2>

              {data.items.map((item) => (
                <CartItemRow key={item.variantId} item={item} />
              ))}
            </div>
          </SectionCard>
        </div>

        {/* RIGHT */}
        <div className="lg:sticky lg:top-20 h-fit">
          <SectionCard>
            <CartSummary summary={data.summary} isMutating={isMutating} items={data.items} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
