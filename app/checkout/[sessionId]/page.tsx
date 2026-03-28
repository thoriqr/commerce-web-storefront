import { CheckoutMain } from "@/features/checkout/components/checkout-main";

type Props = {
  params: Promise<{
    sessionId: string;
  }>;
};

export default async function CheckoutPage({ params }: Props) {
  const { sessionId } = await params;

  return <CheckoutMain sessionId={Number(sessionId)} />;
}
