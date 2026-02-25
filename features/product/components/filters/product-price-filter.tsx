"use client";

import { Input } from "@/components/ui/input";

import { formatCurrency, sanitizeNumber } from "../../utils/format-currency";

type Props = {
  min?: number;
  max?: number;
  onChangeMin: (value: string) => void;
  onChangeMax: (value: string) => void;
  onBlur?: () => void;
};

export function ProductPriceFilter({ min, max, onChangeMin, onChangeMax, onBlur }: Props) {
  const handleChange = (raw: string, setter: (v: string) => void) => {
    const sanitized = sanitizeNumber(raw);
    setter(sanitized);
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">Price</h4>

      <div className="flex gap-2">
        {/* MIN */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">Rp</span>

          <Input
            placeholder="Min"
            inputMode="numeric"
            className="pl-9"
            value={formatCurrency(min)}
            onChange={(e) => handleChange(e.target.value, onChangeMin)}
            onBlur={onBlur}
          />
        </div>

        {/* MAX */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">Rp</span>

          <Input
            placeholder="Max"
            inputMode="numeric"
            className="pl-9"
            value={formatCurrency(max)}
            onChange={(e) => handleChange(e.target.value, onChangeMax)}
            onBlur={onBlur}
          />
        </div>
      </div>
    </div>
  );
}
