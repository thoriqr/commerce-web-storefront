import { redirect } from "next/navigation";

export default async function PaymentRedirectPage({ searchParams }: { searchParams: Promise<{ order_id?: string }> }) {
  const params = await searchParams;
  const orderId = params.order_id;

  if (!orderId) {
    redirect("/");
  }

  redirect(`/order/${orderId}`);
}
