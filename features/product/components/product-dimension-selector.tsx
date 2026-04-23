"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductDetail } from "@/features/product/types";
import { useEffect, useMemo, useState } from "react";

type Props = {
  product: ProductDetail;
  activeVariantId: string;
  onSwitchStart: () => void;
};

export function ProductDimensionSelector({ product, activeVariantId, onSwitchStart }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // local state sebagai source of truth
  const [selectedVariantId, setSelectedVariantId] = useState(activeVariantId);

  // sync kalau URL berubah (misalnya user back/forward)
  useEffect(() => {
    setSelectedVariantId(activeVariantId);
  }, [activeVariantId]);

  const variantById = useMemo(() => {
    const map = new Map<string, (typeof product.variants)[number]>();

    for (const variant of product.variants) {
      map.set(String(variant.id), variant);
    }

    return map;
  }, [product]);

  const variantMap = useMemo(() => {
    const map = new Map<string, (typeof product.variants)[number]>();

    for (const variant of product.variants) {
      const key = variant.options
        .map((opt) => `${opt.dimensionKey}:${opt.valueKey}`)
        .sort()
        .join("|");

      map.set(key, variant);
    }

    return map;
  }, [product]);

  const activeVariant = variantById.get(selectedVariantId);

  if (!activeVariant) return null;

  const handleSelect = (dimensionKey: string, valueKey: string) => {
    const nextSelection = activeVariant.options.map((opt) => (opt.dimensionKey === dimensionKey ? { ...opt, valueKey } : opt));

    const nextKey = nextSelection
      .map((opt) => `${opt.dimensionKey}:${opt.valueKey}`)
      .sort()
      .join("|");

    const matchingVariant = variantMap.get(nextKey);

    if (!matchingVariant) return;

    const nextId = String(matchingVariant.id);

    if (nextId === selectedVariantId) return;

    onSwitchStart();

    setSelectedVariantId(nextId);

    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", nextId);

    router.replace(`?${params.toString()}`, { scroll: false });
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
