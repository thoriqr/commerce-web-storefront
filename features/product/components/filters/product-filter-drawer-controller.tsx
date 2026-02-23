"use client";

import { useListingFilterController } from "../../hooks/use-listing-filter-controller";
import { DimensionFilter } from "../../types";
import { ProductDimensionFilter } from "./product-dimension-filter";
import { ProductFilterDrawer } from "./product-filter-drawer";
import { ProductPriceFilter } from "./product-price-filter";

type Props = {
  dimensions: DimensionFilter[];
};

export function ProductFilterDrawerController({ dimensions }: Props) {
  const filter = useListingFilterController({
    dimensions,
    mode: "draft"
  });

  return (
    <ProductFilterDrawer
      activeCount={filter.activeCount}
      draftCount={filter.draftCount}
      hasChanges={filter.hasChanges && !filter.priceError}
      onApply={filter.apply}
      onReset={filter.resetAll}
    >
      <ProductPriceFilter
        min={filter.minDraft ? Number(filter.minDraft) : undefined}
        max={filter.maxDraft ? Number(filter.maxDraft) : undefined}
        onChangeMin={filter.setMinDraft}
        onChangeMax={filter.setMaxDraft}
      />

      {filter.priceError && <p className="text-xs text-destructive">{filter.priceError}</p>}

      {dimensions && <ProductDimensionFilter dimensions={dimensions} selected={filter.selected} onToggle={filter.toggleDimension} />}
    </ProductFilterDrawer>
  );
}
