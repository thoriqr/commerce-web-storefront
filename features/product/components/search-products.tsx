import { Suspense } from "react";
import { ProductFilterSidebarSkeleton } from "./skeletons/product-filter-sidebar-skeleton";
import SearchFilterBoundary from "./search-filter-boundary";
import { ProductMobileTopBarSkeleton } from "./skeletons/product-mobile-topbar-skeleton";
import SearchDesktopSort from "./search-desktop-sort";
import SearchMobileTopBoundary from "./search-mobile-top-boundary";
import SearchProductList from "./search-product-list";

export default function SearchProducts({ query }: { query: string }) {
  return (
    <div className="flex gap-8">
      <Suspense fallback={<ProductFilterSidebarSkeleton />}>
        <SearchFilterBoundary query={query} />
      </Suspense>

      {/* RIGHT AREA */}
      <div className="flex-1 space-y-6">
        {/* MOBILE TOPBAR */}
        <Suspense fallback={<ProductMobileTopBarSkeleton />}>
          <SearchMobileTopBoundary query={query} />
        </Suspense>

        {/* DESKTOP SORT */}
        <SearchDesktopSort />

        {/* PRODUCT GRID (Client, no suspense here) */}
        <SearchProductList query={query} />
      </div>
    </div>
  );
}
