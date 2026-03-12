"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

type Props = {
  price: number;
  stock: number;
  mobile?: boolean;
  isVariantLoading: boolean;
};

export function ProductPurchaseSection({ price, stock, isVariantLoading, mobile }: Props) {
  const [qty, setQty] = useState<string>(stock > 0 ? "1" : "0");

  const isOutOfStock = stock === 0;

  const isDisabled = isVariantLoading || isOutOfStock;

  // SAFE QTY (anti stale)
  const numericQty = Number(qty);
  const safeQty = isOutOfStock ? 0 : isNaN(numericQty) ? 1 : Math.min(Math.max(numericQty, 1), stock);

  const decrease = () => {
    if (isOutOfStock) return;
    setQty(String(Math.max(safeQty - 1, 1)));
  };

  const increase = () => {
    if (isOutOfStock) return;
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
    if (isOutOfStock) {
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
        {/* PRICE + STOCK */}
        <div className="space-y-1">
          {isVariantLoading ? (
            <>
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-3 w-20" />
            </>
          ) : (
            <>
              <p className="text-base font-semibold">Rp {price.toLocaleString("id-ID")}</p>

              {isOutOfStock ? (
                <p className="text-xs text-destructive font-medium">Out of stock</p>
              ) : (
                <p className="text-xs text-muted-foreground">{stock} available</p>
              )}
            </>
          )}
        </div>

        {/* QTY + BUTTON */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-md shrink-0">
            <Button variant="ghost" size="icon" onClick={decrease} disabled={isDisabled || safeQty <= 1} className="h-8 w-8">
              <Minus className="h-4 w-4" />
            </Button>

            <Input
              value={safeQty}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              disabled={isDisabled}
              className="w-10 text-center text-sm outline-none disabled:opacity-50"
              inputMode="numeric"
            />

            <Button variant="ghost" size="icon" onClick={increase} disabled={isDisabled || safeQty >= stock} className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button className="flex-1" disabled={isDisabled}>
            {isVariantLoading ? "Loading..." : isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    );
  }

  // ================= DESKTOP =================
  return (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="min-h-5">
        {isVariantLoading ? (
          <Skeleton className="h-4 w-24" />
        ) : (
          <p className="text-sm text-muted-foreground">{isOutOfStock ? "Out of stock" : `${stock} available`}</p>
        )}
      </div>

      <div className="flex items-center border rounded-md w-fit">
        <Button variant="ghost" size="icon" onClick={decrease} disabled={isDisabled || safeQty <= 1}>
          <Minus className="h-4 w-4" />
        </Button>

        <Input
          value={safeQty}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          disabled={isDisabled}
          className="w-10 text-center text-sm outline-none disabled:opacity-50"
          inputMode="numeric"
        />

        <Button variant="ghost" size="icon" onClick={increase} disabled={isDisabled || safeQty >= stock}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button className="w-full" disabled={isDisabled}>
        {isVariantLoading ? "Loading..." : isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
