import { CheckoutSession } from "../types";

type Props = {
  items: CheckoutSession["items"];
};

export function CheckoutItems({ items }: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium">Items</h2>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.variantId} className="flex gap-3 rounded-md border bg-muted/40 p-3 transition hover:bg-muted/60">
            {/* IMAGE */}
            <div className="size-16 bg-muted rounded-md" />

            {/* INFO */}
            <div className="flex-1 space-y-1 text-sm">
              <p className="font-medium">{item.productName}</p>

              {/* OPTIONS */}
              {item.options.length > 0 && (
                <p className="text-xs text-muted-foreground">{item.options.map((opt) => `${opt.dimension}: ${opt.value}`).join(", ")}</p>
              )}

              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>

              {/* WARNING */}
              {item.warning && <p className="text-xs text-destructive">{item.warning}</p>}
            </div>

            {/* PRICE */}
            <div className="text-sm font-medium">Rp {item.price.toLocaleString("id-ID")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
