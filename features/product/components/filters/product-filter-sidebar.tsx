import { DimensionFilter } from "../../types";
import { ProductDimensionFilter } from "./product-dimension-filter";
import { ProductPriceFilter } from "./product-price-filter";

export default function ProductFilterSidebar({ dimensions }: { dimensions: DimensionFilter[] }) {
  return (
    <aside className="hidden w-64 shrink-0 md:block">
      <div className="sticky top-20 space-y-8">
        <ProductPriceFilter />
        <ProductDimensionFilter dimensions={dimensions} />
      </div>
    </aside>
  );
}
