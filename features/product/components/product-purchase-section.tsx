"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useAddItem } from "@/features/cart/hooks/use-add-item";
import { getVariantStatusText } from "./get-variant-status-text";
import { ProductVariantDetail } from "../types";
import { formatRupiah } from "@/shared/utils/formatter";

type Props = {
  variantId: number;
  variant?: ProductVariantDetail;
  mobile?: boolean;
  isVariantLoading: boolean;
};

export function ProductPurchaseSection({ variantId, variant, isVariantLoading, mobile }: Props) {
  const price = variant?.price ?? 0;
  const stock = variant?.stock ?? 0;
  const outOfStock = stock === 0;
  const disablePurchase = isVariantLoading || variant?.isAvailable === false;

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
              <p className="text-base font-semibold">{formatRupiah(price)}</p>

              {getVariantStatusText(variant?.warning ?? null, stock)}
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

          <Button onClick={handleAddToCart} className="flex-1" disabled={buttonDisabled}>
            Add to Cart
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
          <p className="text-base font-semibold">{formatRupiah(price)}</p>

          {getVariantStatusText(variant?.warning ?? null, stock)}
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
        Add to Cart
      </Button>
    </div>
  );
}
