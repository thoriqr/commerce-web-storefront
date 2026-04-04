import CartView from "@/features/cart/components/cart-view";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Shopping Cart",
    description: "Review your items before checkout"
  };
}

export default function CartPage() {
  return <CartView />;
}
