import OrdersTab from "@/features/user/components/orders-tab";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "My Orders",
    description: "View and manage your orders"
  };
}

export default function OrdersPage() {
  return <OrdersTab />;
}
