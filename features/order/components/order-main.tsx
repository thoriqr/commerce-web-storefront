"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { useOrder } from "../hooks/use-order";
import { SectionCard } from "@/components/section-card";
import OrderStatus from "./order-status";
import OrderItems from "./order-items";
import ShippingAddress from "./shipping-address";
import OrderSummary from "./order-summary";

type Props = {
  orderCode: string;
};

export default function OrderMain({ orderCode }: Props) {
  const { data, isLoading, error, refetch } = useOrder(orderCode);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error || !data) {
    return <EmptyState title="Order not available" description="Order not found." />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* LEFT */}
      <div className="space-y-6">
        <SectionCard>
          <OrderStatus data={data} refetch={refetch} />
        </SectionCard>

        <SectionCard>
          <OrderItems items={data.items} />
        </SectionCard>

        <SectionCard>
          <ShippingAddress data={data} />
        </SectionCard>
      </div>

      {/* RIGHT */}
      <div className="space-y-6 lg:sticky lg:top-6 h-fit">
        <SectionCard>
          <OrderSummary data={data} />
        </SectionCard>
      </div>
    </div>
  );
}
