import CategoryProductList from "./category-product-list";
import CategoryDesktopSort from "./category-desktop-sort";
import CategoryFilterBoundary from "./category-filter-boundary";
import CategoryMobileTopBarBoundary from "./category-mobile-topbar-boundary";
import { Suspense } from "react";
import { ProductFilterSidebarSkeleton } from "@/features/product/components/skeletons/product-filter-sidebar-skeleton";
import { ProductMobileTopBarSkeleton } from "@/features/product/components/skeletons/product-mobile-topbar-skeleton";

export function CategoryProducts({ slug }: { slug: string[] }) {
  const slugPath = slug.join("/");

  return (
    <div className="flex gap-8">
      {/* LEFT FILTER */}
      <Suspense fallback={<ProductFilterSidebarSkeleton />}>
        <CategoryFilterBoundary slugPath={slugPath} />
      </Suspense>

      {/* RIGHT AREA */}
      <div className="flex-1 space-y-6">
        {/* MOBILE TOPBAR */}
        <Suspense fallback={<ProductMobileTopBarSkeleton />}>
          <CategoryMobileTopBarBoundary slugPath={slugPath} />
        </Suspense>

        {/* DESKTOP SORT */}
        <CategoryDesktopSort />

        {/* PRODUCT GRID (Client, no suspense here) */}
        <CategoryProductList slugPath={slugPath} />
      </div>
    </div>
  );
}
