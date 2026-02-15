"use client";

import { Input } from "@/components/ui/input";

type Props = {
  min?: number;
  max?: number;
  onChangeMin?: (v: string) => void;
  onChangeMax?: (v: string) => void;
};

export function ProductPriceFilter({ min, max, onChangeMin, onChangeMax }: Props) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">Price</h4>

      <div className="flex gap-2">
        <Input placeholder="Min" type="number" value={min ?? ""} onChange={(e) => onChangeMin?.(e.target.value)} />
        <Input placeholder="Max" type="number" value={max ?? ""} onChange={(e) => onChangeMax?.(e.target.value)} />
      </div>
    </div>
  );
}
