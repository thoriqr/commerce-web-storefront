import Image from "next/image";
import { getImageUrl } from "@/shared/utils/media";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUpdateItem } from "../hooks/use-update-item";
import { useDeleteItem } from "../hooks/use-delete-item";
import { CartItem } from "../types";
import { formatRupiah } from "@/shared/utils/formatter";
import { navigateProductPage } from "@/shared/utils/navigate-product-page";

type Props = {
  item: CartItem;
  onClose?: () => void;
};

const MAX_CART_ITEM_QTY = 99;

export default function CartItemRow({ item, onClose }: Props) {
  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();

  const isMutating = updateItem.isPending || deleteItem.isPending;

  const isUnavailable = item.warning === "UNAVAILABLE";
  const isOutOfStock = item.warning === "OUT_OF_STOCK";
  const isInsufficient = item.warning === "INSUFFICIENT_STOCK";
  const isLowStock = item.warning === "LOW_STOCK";

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
      <div className={`flex flex-1 gap-3 ${blurRow ? "opacity-50" : ""}`}>
        {/* Image */}
        <Link
          href={navigateProductPage(item.productId, item.slug)}
          onClick={onClose}
          className="h-16 w-16 overflow-hidden rounded-md border bg-muted"
        >
          <Image src={getImageUrl(item.imageKey)} alt={item.name} width={64} height={64} className="h-full w-full object-cover" />
        </Link>

        <div className="flex flex-1 flex-col">
          {/* Name */}
          <Link href={navigateProductPage(item.productId, item.slug)} onClick={onClose} className="text-sm font-medium line-clamp-2 w-fit">
            {item.name}
          </Link>
          {/* Options */}
          {item.options.length > 0 && (
            <p className="text-xs text-muted-foreground">{item.options.map((o) => `${o.dimension}: ${o.value}`).join(" • ")}</p>
          )}
          {/* Unified Warning */}
          {isUnavailable && <p className="text-xs text-destructive mt-1">Item no longer available</p>}
          {isOutOfStock && <p className="text-xs text-destructive mt-1">Out of stock</p>}
          {isInsufficient && item.stock > 0 && <p className="text-xs text-orange-500 mt-1">Only {item.stock} left in stock</p>}
          {isLowStock && !isInsufficient && <p className="text-xs text-orange-500 mt-1">Low stock ({item.stock} left)</p>}
          {/* Stock info */}
          {item.stock > 0 && <p className="text-xs text-muted-foreground mt-1">Stock: {item.stock}</p>}

          {/* Price + Qty */}
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

      {/* Delete */}
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
