import { getImageUrl } from "@/lib/media";
import { CheckoutSession } from "../types";
import { getItemWarningLabel } from "../util";
import Image from "next/image";
import { formatRupiah } from "@/shared/utils/formatter";

type Props = {
  items: CheckoutSession["items"];
};

export function CheckoutItems({ items }: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium">Items</h2>

      <div className="space-y-3">
        {items.map((item) => {
          const imageUrl = item.imageKey ? getImageUrl(item.imageKey) : null;
          const warningLabel = getItemWarningLabel(item.warning);

          return (
            <div key={item.variantId} className="flex gap-3 rounded-md border bg-muted/40 p-3 transition hover:bg-muted/60">
              {/* IMAGE */}
              <div className="relative size-16 rounded-md overflow-hidden bg-muted shrink-0">
                {imageUrl ? (
                  <Image src={imageUrl} alt={item.productName} loading="eager" fill sizes="64px" className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                )}
              </div>

              {/* INFO */}
              <div className="flex-1 space-y-1 text-sm min-w-0">
                <p className="font-medium leading-snug">{item.productName}</p>

                {/* OPTIONS */}
                {item.options.length > 0 && (
                  <p className="text-xs text-muted-foreground">{item.options.map((opt) => `${opt.dimension}: ${opt.value}`).join(", ")}</p>
                )}

                {/* PRICE × QTY */}
                <p className="text-xs text-muted-foreground">
                  {formatRupiah(item.price)} × {item.quantity}
                </p>

                {/* WARNING */}
                {warningLabel && <p className="text-xs text-destructive font-medium">{warningLabel}</p>}
              </div>

              {/* SUBTOTAL */}
              <div className="text-right min-w-[90px]">
                <p className="font-medium text-sm">{formatRupiah(item.price * item.quantity)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
