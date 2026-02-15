import { Product, ProductDimension } from "@/lib/products/types";
import { ProductDimensionFilter } from "./product-dimension-filter";
import { ProductFilterDrawer } from "./product-filter-drawer";
import { ProductFilterSidebar } from "./product-filter-sidebar";
import { ProductGrid } from "./product-grid";
import { ProductPriceFilter } from "./product-price-filter";
import { ProductSortSelect } from "./product-sort-select";

export function ProductListingLayout({ dimensions, products }: { dimensions: ProductDimension[]; products: Product[] }) {
  return (
    <div className="space-y-6">
      {/* Mobile controls */}
      <div className="sticky top-28 z-40 md:hidden">
        <div className="rounded-lg border bg-background shadow-sm">
          <div className="flex h-12 items-center justify-between px-3 gap-1.5 md:gap-0">
            <ProductFilterDrawer>
              <ProductPriceFilter />
              <ProductDimensionFilter dimensions={dimensions} />
            </ProductFilterDrawer>

            <ProductSortSelect />
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden w-64 shrink-0 md:block">
          <div className="sticky top-20">
            <ProductFilterSidebar dimensions={dimensions} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Desktop Top Bar */}
          <div className="hidden items-center justify-between md:flex">
            <p className="text-sm text-muted-foreground">{products.length} products</p>

            <ProductSortSelect />
          </div>

          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
