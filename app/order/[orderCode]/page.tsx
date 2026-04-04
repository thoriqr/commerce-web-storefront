import OrderMain from "@/features/order/components/order-main";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    orderCode: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { orderCode } = await params;

  return {
    title: `Order #${orderCode}`,
    description: "View your order details and status"
  };
}

export default async function OrderPage({ params }: Props) {
  const { orderCode } = await params;

  return <OrderMain orderCode={orderCode} />;
}
