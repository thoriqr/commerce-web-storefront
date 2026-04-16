import Image from "next/image";
import { OrderDetail } from "../types";
import { getImageUrl } from "@/shared/utils/media";
import Link from "next/link";
import { formatRupiah } from "@/shared/utils/formatter";
import { navigateProductPage } from "@/shared/utils/navigate-product-page";

export default function OrderItems({ items }: { items: OrderDetail["items"] }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium">Items</h2>

      {items.map((item) => {
        const imageUrl = item.imageKey ? getImageUrl(item.imageKey) : null;

        return (
          <div key={item.variantId} className="flex gap-3 rounded-md border bg-muted/40 p-3 transition hover:bg-muted/60">
            {/* IMAGE */}
            <Link
              href={navigateProductPage(item.productId, item.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 flex-1 min-w-0"
            >
              {/* IMAGE */}
              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0">
                {imageUrl ? (
                  <Image src={imageUrl} alt={item.name} fill sizes="64px" className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                )}
              </div>

              {/* INFO */}
              <div className="flex-1 space-y-1 text-sm">
                <p className="font-medium leading-snug hover:underline">{item.name}</p>

                {item.options.length > 0 && (
                  <p className="text-xs text-muted-foreground">{item.options.map((opt) => `${opt.dimension}: ${opt.value}`).join(", ")}</p>
                )}

                <p className="text-xs text-muted-foreground">
                  {formatRupiah(item.price)} × {item.quantity}
                </p>
              </div>
            </Link>

            {/* SUBTOTAL */}
            <div className="text-right min-w-[90px]">
              <p className="font-medium text-sm">{formatRupiah(item.price * item.quantity)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
