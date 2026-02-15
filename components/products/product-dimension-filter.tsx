"use client";

import { Checkbox } from "@/components/ui/checkbox";

type Dimension = {
  id: string;
  name: string;
  values: { id: string; label: string }[];
};

type Props = {
  dimensions: Dimension[];
};

export function ProductDimensionFilter({ dimensions }: Props) {
  return (
    <div className="space-y-6">
      {dimensions.map((dim) => (
        <div key={dim.id} className="space-y-3">
          <h4 className="text-sm font-semibold">{dim.name}</h4>

          <div className="space-y-2">
            {dim.values.map((val) => (
              <div key={val.id} className="flex items-center gap-2">
                <Checkbox id={`${dim.id}-${val.id}`} />
                <label htmlFor={`${dim.id}-${val.id}`} className="text-sm text-muted-foreground">
                  {val.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
