import { OrderDetail } from "../types";

export default function OrderSummary({ data }: { data: OrderDetail }) {
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
    </div>
  );
}
