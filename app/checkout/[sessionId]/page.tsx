import { CheckoutMain } from "@/features/checkout/components/checkout-main";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    sessionId: string;
  }>;
};

export function generateMetadata(): Metadata {
  return {
    title: "Checkout",
    description: "Complete your purchase"
  };
}

export default async function CheckoutPage({ params }: Props) {
  const { sessionId } = await params;

  return <CheckoutMain sessionId={Number(sessionId)} />;
}
