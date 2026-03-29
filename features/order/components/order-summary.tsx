import Link from "next/link";
import { OrderDetail } from "../types";
import { Button } from "@/components/ui/button";

export default function OrderSummary({ data }: { data: OrderDetail }) {
  const showHistoryButton = data.paymentStatus === "PAID" || data.status === "CANCELLED" || data.status === "COMPLETED";

  return (
    <div className="space-y-4 text-sm">
      <h2 className="text-sm font-medium">Summary</h2>

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>Rp {data.subtotal.toLocaleString("id-ID")}</span>
      </div>

      <div className="flex justify-between">
        <span>Shipping</span>
        <span>Rp {data.shippingCost.toLocaleString("id-ID")}</span>
      </div>

      <div className="border-t pt-2 flex justify-between font-medium">
        <span>Total</span>
        <span>Rp {data.total.toLocaleString("id-ID")}</span>
      </div>

      {/* ACTION */}
      {showHistoryButton && (
        <Link href="/user/orders">
          <Button variant="outline" className="w-full">
            View Order History
          </Button>
        </Link>
      )}
    </div>
  );
}
