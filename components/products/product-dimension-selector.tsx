"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductDetail } from "@/lib/products/types";

type Props = {
  product: ProductDetail;
  activeVariantId: string;
};

export function ProductDimensionSelector({ product, activeVariantId }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔥 Ambil active variant
  const activeVariant = product.variants.find((v) => v.id === activeVariantId);

  if (!activeVariant) return null;

  const handleSelect = (dimensionId: string, valueId: string) => {
    // 🔥 Bangun selection baru berdasarkan active variant
    const nextSelection = activeVariant.options.map((opt) => (opt.dimensionId === dimensionId ? { ...opt, valueId } : opt));

    // 🔥 Cari variant yang match seluruh selection
    const matchingVariant = product.variants.find((variant) =>
      nextSelection.every((selected) => variant.options.some((opt) => opt.dimensionId === selected.dimensionId && opt.valueId === selected.valueId))
    );

    if (!matchingVariant) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", matchingVariant.id);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      {product.dimensions.map((dimension) => {
        const selectedOption = activeVariant.options.find((opt) => opt.dimensionId === dimension.id);

        return (
          <div key={dimension.id} className="space-y-2">
            <p className="text-sm font-medium">{dimension.name}</p>

            <div className="flex flex-wrap gap-2">
              {dimension.values.map((value) => {
                const isActive = selectedOption?.valueId === value.id;

                return (
                  <Button key={value.id} variant={isActive ? "default" : "outline"} size="sm" onClick={() => handleSelect(dimension.id, value.id)}>
                    {value.name}
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
