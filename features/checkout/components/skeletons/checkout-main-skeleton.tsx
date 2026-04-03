import { SectionCard } from "@/components/section-card";
import { CheckoutItemsSkeleton } from "./checkout-items-skeleton";
import { CheckoutStatusSkeleton } from "./checkout-status-skeleton";
import { AddressSectionSkeleton } from "./address-section-skeleton";
import { ShippingSectionSkeleton } from "./shipping-section-skeleton";
import { CheckoutSummarySkeleton } from "./order-summary-skeleton";

export default function CheckoutMainSkeleton() {
  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_320px]">
      {/* LEFT */}
      <div className="space-y-4 sm:space-y-6">
        <CheckoutStatusSkeleton />

        <SectionCard>
          <CheckoutItemsSkeleton />
        </SectionCard>

        <SectionCard>
          <AddressSectionSkeleton />
        </SectionCard>

        <SectionCard>
          <ShippingSectionSkeleton />
        </SectionCard>
      </div>

      {/* RIGHT */}
      <div className="space-y-4 sm:space-y-6">
        <SectionCard>
          <CheckoutSummarySkeleton />
        </SectionCard>
      </div>
    </div>
  );
}
