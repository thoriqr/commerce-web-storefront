import { ProductFilterController } from "@/features/product/components/filters/product-filter-controller";
import { ProductFilterSidebarLayout } from "@/features/product/components/filters/product-filter-sidebar-layout";

export default function CollectionFilterBoundary() {
  return (
    <ProductFilterSidebarLayout>
      <ProductFilterController />
    </ProductFilterSidebarLayout>
  );
}
