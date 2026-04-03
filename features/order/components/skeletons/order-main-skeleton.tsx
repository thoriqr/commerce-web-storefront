import { SectionCard } from "@/components/section-card";
import { OrderStatusSkeleton } from "./order-status-skeleton";
import { OrderTimelineSkeleton } from "./order-timeline-skeleton";
import { OrderItemsSkeleton } from "./order-items-skeleton";
import { ShippingAddressSkeleton } from "./shipping-address-skeleton";
import { OrderSummarySkeleton } from "./order-summary-skeleton";

export default function OrderMainSkeleton() {
  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_320px]">
      {/* LEFT */}
      <div className="space-y-4 sm:space-y-6">
        <SectionCard>
          <OrderStatusSkeleton />
        </SectionCard>

        <SectionCard>
          <OrderTimelineSkeleton />
        </SectionCard>

        <SectionCard>
          <OrderItemsSkeleton />
        </SectionCard>

        <SectionCard>
          <ShippingAddressSkeleton />
        </SectionCard>
      </div>

      {/* RIGHT */}
      <div className="space-y-4 sm:space-y-6">
        <SectionCard>
          <OrderSummarySkeleton />
        </SectionCard>
      </div>
    </div>
  );
}
