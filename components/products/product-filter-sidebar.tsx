import { ProductDimensionFilter } from "./product-dimension-filter";
import { ProductPriceFilter } from "./product-price-filter";

export function ProductFilterSidebar({ dimensions }: { dimensions: any[] }) {
  return (
    <aside className="hidden w-64 shrink-0 space-y-8 md:block">
      <ProductPriceFilter />
      <ProductDimensionFilter dimensions={dimensions} />
    </aside>
  );
}
