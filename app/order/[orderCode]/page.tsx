import OrderMain from "@/features/order/components/order-main";

type Props = {
  params: Promise<{
    orderCode: string;
  }>;
};

export default async function OrderPage({ params }: Props) {
  const { orderCode } = await params;

  return <OrderMain orderCode={orderCode} />;
}
