"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";

type Props = {
  price: number;
  stock: number;
  mobile?: boolean;
};

export function ProductPurchaseSection({ price, stock, mobile }: Props) {
  const [qty, setQty] = useState<string>(stock > 0 ? "1" : "0");

  const isOutOfStock = stock === 0;

  // 🔥 SAFE QTY (anti stale)
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
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-base font-semibold">Rp {price.toLocaleString("id-ID")}</p>

          {isOutOfStock ? (
            <p className="text-xs text-destructive font-medium">Out of stock</p>
          ) : (
            <p className="text-xs text-muted-foreground">{stock} available</p>
          )}
        </div>

        <div className="flex items-center border rounded-md">
          <Button variant="ghost" size="icon" onClick={decrease} disabled={safeQty <= 1 || isOutOfStock} className="h-8 w-8">
            <Minus className="h-4 w-4" />
          </Button>

          <Input
            value={safeQty}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            disabled={isOutOfStock}
            className="w-10 text-center text-sm outline-none disabled:opacity-50"
            inputMode="numeric"
          />

          <Button variant="ghost" size="icon" onClick={increase} disabled={safeQty >= stock || isOutOfStock} className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button disabled={isOutOfStock}>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</Button>
      </div>
    );
  }

  // ================= DESKTOP =================
  return (
    <div className="space-y-4 border rounded-lg p-4">
      <p className="text-sm text-muted-foreground">{isOutOfStock ? "Out of stock" : `${stock} available`}</p>

      <div className="flex items-center border rounded-md w-fit">
        <Button variant="ghost" size="icon" onClick={decrease} disabled={safeQty <= 1 || isOutOfStock}>
          <Minus className="h-4 w-4" />
        </Button>

        <Input
          value={safeQty}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          disabled={isOutOfStock}
          className="w-10 text-center text-sm outline-none disabled:opacity-50"
          inputMode="numeric"
        />

        <Button variant="ghost" size="icon" onClick={increase} disabled={safeQty >= stock || isOutOfStock}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button className="w-full" disabled={isOutOfStock}>
        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
