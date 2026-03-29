"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { useCheckoutSession } from "../hooks/use-checkout-session";
import { AddressSection } from "./address-section";
import { CheckoutItems } from "./checkout-items";
import { CheckoutMainSkeleton } from "./checkout-main-skeleton";
import { CheckoutStatus } from "./checkout-status";
import { OrderSummary } from "./order-summary";
import { SectionCard } from "../../../components/section-card";
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
    return <EmptyState title="Checkout not available" description="This checkout session is invalid or has expired." />;
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
          <AddressSection sessionId={data.sessionId} address={data.address} />
        </SectionCard>

        {/* SHIPPING */}
        <SectionCard>
          <ShippingSection sessionId={data.sessionId} disabled={!data.address} />
        </SectionCard>
      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-6">
        <div className="lg:sticky lg:top-6 h-fit">
          <SectionCard>
            <OrderSummary data={data} sessionId={data.sessionId} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
