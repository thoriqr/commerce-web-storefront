"use client";

import { DimensionFilter } from "../../types";
import { ProductDimensionFilter } from "./product-dimension-filter";
import { ProductFilterDrawer } from "./product-filter-drawer";
import { ProductPriceFilter } from "./product-price-filter";
import { ProductSortSelect } from "./product-sort-select";

type Props = {
  dimensions: DimensionFilter[];
};

export function ProductMobileTopBar({ dimensions }: Props) {
  return (
    <div className="sticky top-28 z-40 md:hidden">
      <div className="rounded-lg border bg-background shadow-sm">
        <div className="flex h-12 items-center justify-between px-3 gap-1.5">
          <ProductFilterDrawer>
            <ProductPriceFilter />
            <ProductDimensionFilter dimensions={dimensions} />
          </ProductFilterDrawer>

          <ProductSortSelect />
        </div>
      </div>
    </div>
  );
}
