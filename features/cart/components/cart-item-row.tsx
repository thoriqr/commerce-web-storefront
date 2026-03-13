import Image from "next/image";
import { CartItem } from "../types";
import { getImageUrl } from "@/lib/media";
import { formatCurrency } from "@/features/product/utils/format-currency";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  item: CartItem;
  onClose: () => void;
};

export default function CartItemRow({ item, onClose }: Props) {
  const disableIncrease = item.quantity >= item.stock || !item.isAvailable;
  const disableDecrease = item.quantity <= 1 || !item.isAvailable;

  return (
    <div className="flex gap-3 border-b pb-4">
      {/* Image */}
      <div className="h-16 w-16 overflow-hidden rounded-md border bg-muted">
        <Image src={getImageUrl(item.imageKey)} alt={item.name} width={64} height={64} className="h-full w-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Product name */}
        <Link href={`/products/${item.slug}`} onClick={onClose}>
          <p className="text-sm font-medium leading-snug line-clamp-2 hover:underline">{item.name}</p>
        </Link>

        {/* Variant options */}
        {item.options.length > 0 && (
          <p className="text-xs text-muted-foreground">{item.options.map((o) => `${o.dimension}: ${o.value}`).join(" • ")}</p>
        )}

        {/* Stock hints */}
        {item.stockWarning === "OUT_OF_STOCK" && <p className="text-xs text-destructive mt-1">Out of stock</p>}

        {item.stockWarning === "INSUFFICIENT_STOCK" && <p className="text-xs text-orange-500 mt-1">Only {item.stock} left in stock</p>}

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-medium">Rp {formatCurrency(item.price)}</span>

          {/* Quantity controls */}
          <div className="flex items-center gap-1">
            {/* Decrease */}
            <Button size="icon" variant="outline" className="h-7 w-7" disabled={disableDecrease}>
              <Minus className="h-3.5 w-3.5" />
            </Button>

            {/* Quantity */}
            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>

            {/* Increase */}
            <Button size="icon" variant="outline" className="h-7 w-7" disabled={disableIncrease}>
              <Plus className="h-3.5 w-3.5" />
            </Button>

            {/* Delete */}
            <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
