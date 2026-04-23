"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductDetail } from "@/features/product/types";
import { startTransition, useEffect, useState } from "react";

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

  const activeVariant = product.variants.find((v) => String(v.id) === selectedVariantId);

  if (!activeVariant) return null;

  const handleSelect = (dimensionKey: string, valueKey: string) => {
    const nextSelection = activeVariant.options.map((opt) => (opt.dimensionKey === dimensionKey ? { ...opt, valueKey } : opt));

    const matchingVariant = product.variants.find((variant) =>
      nextSelection.every((selected) =>
        variant.options.some((opt) => opt.dimensionKey === selected.dimensionKey && opt.valueKey === selected.valueKey)
      )
    );

    if (!matchingVariant) return;

    const nextId = String(matchingVariant.id);

    if (nextId === selectedVariantId) return;

    onSwitchStart();

    setSelectedVariantId(nextId);

    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", nextId);

    startTransition(() => {
      router.replace(`?${params.toString()}`, { scroll: false });
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
