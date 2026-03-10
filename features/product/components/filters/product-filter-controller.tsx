"use client";

import { useListingFilterController } from "../../hooks/use-listing-filter-controller";
import { DimensionFilter } from "../../types";
import { ProductDimensionFilter } from "./product-dimension-filter";
import { ProductPriceFilter } from "./product-price-filter";

type Props = {
  dimensions?: DimensionFilter[];
};

export function ProductFilterController({ dimensions }: Props) {
  const { selected, toggleDimension, minDraft, maxDraft, setMinDraft, setMaxDraft, commitPrice, priceError } = useListingFilterController({
    dimensions,
    mode: "instant"
  });

  return (
    <>
      {/* PRICE */}
      <div className="space-y-2">
        <ProductPriceFilter
          mode="desktop"
          min={minDraft ? Number(minDraft) : undefined}
          max={maxDraft ? Number(maxDraft) : undefined}
          onChangeMin={setMinDraft}
          onChangeMax={setMaxDraft}
          onBlur={commitPrice}
        />

        {priceError && <p className="text-xs text-destructive">{priceError}</p>}
      </div>

      {/* DIMENSION */}
      {dimensions && <ProductDimensionFilter dimensions={dimensions} selected={selected} onToggle={toggleDimension} />}
    </>
  );
}
