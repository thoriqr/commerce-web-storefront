"use client";

import { useCheckoutSession } from "../hooks/use-checkout-session";
import { AddressSection } from "./address-section";
import { CheckoutEmptyState } from "./checkout-empty-state";
import { CheckoutItems } from "./checkout-items";
import { CheckoutMainSkeleton } from "./checkout-main-skeleton";
import { CheckoutStatus } from "./checkout-status";
import { OrderSummary } from "./order-summary";
import { SectionCard } from "./section-card";
import { ShippingSection } from "./shipping-section";

type Props = {
  sessionId: number;
};

export function CheckoutMain({ sessionId }: Props) {
  const { data, isLoading, error } = useCheckoutSession(sessionId);

  if (isLoading) {
    return <CheckoutMainSkeleton />;
  }

  if (error || !data) {
    return <CheckoutEmptyState />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* LEFT SIDE */}
      <div className="space-y-6">
        {/* STATUS */}
        <CheckoutStatus canPlaceOrder={data.canPlaceOrder} reason={data.reason} />

        <SectionCard>
          <CheckoutItems items={data.items} />
        </SectionCard>

        {/* ADDRESS */}
        <SectionCard>
          <AddressSection address={data.address} />
        </SectionCard>

        {/* SHIPPING */}
        <SectionCard>
          <ShippingSection sessionId={data.sessionId} disabled={!data.address} />
        </SectionCard>
      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-6">
        <SectionCard>
          <OrderSummary data={data} />
        </SectionCard>
      </div>
    </div>
  );
}
