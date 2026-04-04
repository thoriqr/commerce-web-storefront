import Image from "next/image";
import { getImageUrl } from "@/lib/media";
import { formatCurrency } from "@/features/product/utils/format-currency";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUpdateItem } from "../hooks/use-update-item";
import { useDeleteItem } from "../hooks/use-delete-item";
import { CartItem } from "../types";
import { formatRupiah } from "@/shared/utils/formatter";

type Props = {
  item: CartItem;
  onClose?: () => void;
};

const MAX_CART_ITEM_QTY = 99;

export default function CartItemRow({ item, onClose }: Props) {
  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();

  const isMutating = updateItem.isPending || deleteItem.isPending;

  const isUnavailable = !item.isAvailable;
  const isOutOfStock = item.stockWarning === "OUT_OF_STOCK";

  const disableIncrease = item.quantity >= item.stock || item.quantity >= MAX_CART_ITEM_QTY || isUnavailable || isOutOfStock || isMutating;

  const disableDecrease = item.quantity <= 1 || isUnavailable || isOutOfStock || isMutating;

  const handleIncrease = () => {
    updateItem.mutate({
      variantId: item.variantId,
      quantity: item.quantity + 1
    });
  };

  const handleDecrease = () => {
    updateItem.mutate({
      variantId: item.variantId,
      quantity: item.quantity - 1
    });
  };

  const handleDelete = () => {
    deleteItem.mutate({
      variantId: item.variantId
    });
  };

  const blurRow = isUnavailable || isOutOfStock;

  return (
    <div className="flex gap-3 border-b pb-4">
      {/* Blur container */}
      <div className={`flex flex-1 gap-3 ${blurRow ? "opacity-50" : ""}`}>
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

          {/* Options */}
          {item.options.length > 0 && (
            <p className="text-xs text-muted-foreground">{item.options.map((o) => `${o.dimension}: ${o.value}`).join(" • ")}</p>
          )}

          {/* Status messages */}
          {isUnavailable && <p className="text-xs text-destructive mt-1">Item no longer available</p>}

          {item.stockWarning === "OUT_OF_STOCK" && <p className="text-xs text-destructive mt-1">Out of stock</p>}

          {item.stockWarning === "INSUFFICIENT_STOCK" && <p className="text-xs text-orange-500 mt-1">Only {item.stock} left in stock</p>}

          {/* Stock */}
          {item.stock > 0 && <p className="text-xs text-muted-foreground mt-1">Stock: {item.stock}</p>}

          {/* Price + quantity */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-medium">{formatRupiah(item.price)}</span>

            <div className="flex items-center gap-1">
              <Button size="icon" variant="outline" className="h-7 w-7" disabled={disableDecrease} onClick={handleDecrease}>
                <Minus className="h-3.5 w-3.5" />
              </Button>

              <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>

              <Button size="icon" variant="outline" className="h-7 w-7" disabled={disableIncrease} onClick={handleIncrease}>
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete button (not blurred) */}
      <div className="flex items-start pt-1">
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
          disabled={isMutating}
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
