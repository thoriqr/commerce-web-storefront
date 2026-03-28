import { OrderDetail } from "../types";

export default function OrderItems({ items }: { items: OrderDetail["items"] }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium">Items</h2>

      {items.map((item) => (
        <div key={item.variantId} className="flex gap-3 text-sm">
          <div className="w-16 h-16 rounded bg-muted" />

          <div className="flex-1">
            <p className="font-medium">{item.name}</p>

            {/* options */}
            <p className="text-xs text-muted-foreground">{item.options.map((o) => `${o.dimension}: ${o.value}`).join(", ")}</p>

            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
          </div>

          <p className="font-medium">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
        </div>
      ))}
    </div>
  );
}
