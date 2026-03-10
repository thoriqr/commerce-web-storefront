import { ProductFilterSidebarLayout } from "@/features/product/components/filters/product-filter-sidebar-layout";
import { ProductFilterController } from "@/features/product/components/filters/product-filter-controller";
import { ProductMobileTopBar } from "@/features/product/components/filters/product-mobile-topbar";
import { ProductFilterDrawerController } from "@/features/product/components/filters/product-filter-drawer-controller";
import CollectionSortControl from "./collection-sort-control";
import CollectionDesktopSort from "./collection-desktop-sort";
import CollectionProductList from "./collection-product-list";

export default function CollectionProducts({ slug }: { slug: string }) {
  return (
    <div className="flex gap-8">
      {/* LEFT FILTER */}
      <ProductFilterSidebarLayout>
        <ProductFilterController />
      </ProductFilterSidebarLayout>

      {/* RIGHT AREA */}
      <div className="flex-1 space-y-6">
        <ProductMobileTopBar filterContent={<ProductFilterDrawerController />} sortControl={<CollectionSortControl />} />

        <CollectionDesktopSort />

        <CollectionProductList slug={slug} />
      </div>
    </div>
  );
}
