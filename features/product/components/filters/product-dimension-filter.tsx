"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DimensionFilter } from "../../types";

export function ProductDimensionFilter({
  dimensions,
  selected,
  onChange
}: {
  dimensions: DimensionFilter[];
  selected?: Record<string, string[]>;
  onChange?: (dimension: string, value: string) => void;
}) {
  return (
    <div className="space-y-6">
      {dimensions.map((dim) => (
        <div key={dim.name} className="space-y-3">
          <h4 className="text-sm font-semibold">{dim.label}</h4>

          <div className="space-y-2">
            {dim.values.map((val) => (
              <div key={val.value} className="flex items-center gap-2">
                <Checkbox
                  id={`${dim.name}-${val.value}`}
                  checked={selected?.[dim.name]?.includes(val.value)}
                  onCheckedChange={() => onChange?.(dim.name, val.value)}
                />
                <label htmlFor={`${dim.name}-${val.value}`} className="text-sm text-muted-foreground">
                  {val.label} ({val.count})
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
