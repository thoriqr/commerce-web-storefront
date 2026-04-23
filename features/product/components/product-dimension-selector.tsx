"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductDetail } from "@/features/product/types";
import { startTransition } from "react";

type Props = {
  product: ProductDetail;
  activeVariantId: string;
};

export function ProductDimensionSelector({ product, activeVariantId }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeVariant = product.variants.find((v) => String(v.id) === activeVariantId);

  if (!activeVariant) return null;

  const handleSelect = (dimensionKey: string, valueKey: string) => {
    // build new selection based on active variant
    const nextSelection = activeVariant.options.map((opt) => (opt.dimensionKey === dimensionKey ? { ...opt, valueKey } : opt));

    // find match variant whole selection
    const matchingVariant = product.variants.find((variant) =>
      nextSelection.every((selected) =>
        variant.options.some((opt) => opt.dimensionKey === selected.dimensionKey && opt.valueKey === selected.valueKey)
      )
    );

    if (!matchingVariant) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", String(matchingVariant.id));

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="space-y-6">
      {product.dimensions.map((dimension) => {
        const selectedOption = activeVariant.options.find((opt) => opt.dimensionKey === dimension.key);

        return (
          <div key={dimension.key} className="space-y-2">
            <p className="text-sm font-medium">{dimension.label}</p>

            <div className="flex flex-wrap gap-2">
              {dimension.values.map((value) => {
                const isActive = selectedOption?.valueKey === value.key;

                return (
                  <Button key={value.key} variant={isActive ? "default" : "outline"} size="sm" onClick={() => handleSelect(dimension.key, value.key)}>
                    {value.label}
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
