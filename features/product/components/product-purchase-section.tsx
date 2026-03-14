"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "../utils/format-currency";
import { useAddItem } from "@/features/cart/hooks/use-add-item";

type Props = {
  variantId: number;
  price: number;
  stock: number;
  mobile?: boolean;
  isVariantLoading: boolean;
  productUnavailable: boolean;
  variantUnavailable: boolean;
  outOfStock: boolean;
  disablePurchase: boolean;
};

export function ProductPurchaseSection({
  variantId,
  price,
  stock,
  isVariantLoading,
  productUnavailable,
  variantUnavailable,
  outOfStock,
  disablePurchase,
  mobile
}: Props) {
  const [qty, setQty] = useState<string>(stock > 0 ? "1" : "0");
  const addItem = useAddItem();
  const isMutating = addItem.isPending;

  // SAFE QTY
  const numericQty = Number(qty);
  const buttonDisabled = disablePurchase || isMutating;
  const safeQty = outOfStock ? 0 : isNaN(numericQty) ? 1 : Math.min(Math.max(numericQty, 1), stock);

  const handleAddToCart = () => {
    if (disablePurchase) return;

    addItem.mutate({
      variantId,
      quantity: safeQty
    });
  };

  const decrease = () => {
    if (outOfStock) return;
    setQty(String(Math.max(safeQty - 1, 1)));
  };

  const increase = () => {
    if (outOfStock) return;
    setQty(String(Math.min(safeQty + 1, stock)));
  };

  const handleChange = (value: string) => {
    if (!/^\d*$/.test(value)) return;

    if (value === "") {
      setQty("");
      return;
    }

    const numberValue = Number(value);
    setQty(String(Math.min(numberValue, stock)));
  };

  const handleBlur = () => {
    if (outOfStock) {
      setQty("0");
      return;
    }

    if (!qty || Number(qty) < 1) {
      setQty("1");
    }
  };

  const statusText = isVariantLoading
    ? "Loading..."
    : productUnavailable || variantUnavailable
      ? "Unavailable"
      : outOfStock
        ? "Out of Stock"
        : "Add to Cart";

  // ================= MOBILE =================
  if (mobile) {
    return (
      <div className="space-y-3">
        <div className="space-y-1">
          {isVariantLoading ? (
            <>
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-3 w-20" />
            </>
          ) : (
            <>
              <p className="text-base font-semibold">Rp {formatCurrency(price)}</p>

              {productUnavailable || variantUnavailable ? (
                <p className="text-xs text-destructive font-medium">Unavailable</p>
              ) : outOfStock ? (
                <p className="text-xs text-destructive font-medium">Out of stock</p>
              ) : (
                <p className="text-xs text-muted-foreground">{stock} available</p>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-md shrink-0">
            <Button variant="ghost" size="icon" onClick={decrease} disabled={buttonDisabled || safeQty <= 1} className="h-8 w-8">
              <Minus className="h-4 w-4" />
            </Button>

            <Input
              value={safeQty}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              disabled={buttonDisabled}
              className="w-10 text-center text-sm"
              inputMode="numeric"
            />

            <Button variant="ghost" size="icon" onClick={increase} disabled={buttonDisabled || safeQty >= stock} className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button className="flex-1" disabled={buttonDisabled}>
            {statusText}
          </Button>
        </div>
      </div>
    );
  }

  // ================= DESKTOP =================
  return (
    <div className="space-y-4 border rounded-lg p-4">
      {isVariantLoading ? (
        <div className="space-y-1">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      ) : (
        <div className="space-y-1">
          <p className="text-base font-semibold">Rp {formatCurrency(price)}</p>

          {productUnavailable || variantUnavailable ? (
            <p className="text-xs text-destructive font-medium">Unavailable</p>
          ) : outOfStock ? (
            <p className="text-xs text-destructive font-medium">Out of stock</p>
          ) : (
            <p className="text-xs text-muted-foreground">{stock} available</p>
          )}
        </div>
      )}

      <div className="flex items-center border rounded-md w-fit">
        <Button variant="ghost" size="icon" onClick={decrease} disabled={buttonDisabled || safeQty <= 1}>
          <Minus className="h-4 w-4" />
        </Button>

        <Input
          value={safeQty}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          disabled={buttonDisabled}
          className="w-10 text-center text-sm"
          inputMode="numeric"
        />

        <Button variant="ghost" size="icon" onClick={increase} disabled={buttonDisabled || safeQty >= stock}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button onClick={handleAddToCart} className="w-full" disabled={buttonDisabled}>
        {statusText}
      </Button>
    </div>
  );
}
