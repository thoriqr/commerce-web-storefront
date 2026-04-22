import { ProductFilterSidebarLayout } from "@/features/product/components/filters/product-filter-sidebar-layout";
import { getCategoryDimensionFilter } from "../api";
import { ProductFilterController } from "@/features/product/components/filters/product-filter-controller";

export default async function CategoryFilterBoundary({ slugPath }: { slugPath: string }) {
  const dimensions = await getCategoryDimensionFilter(slugPath);

  return (
    <ProductFilterSidebarLayout>
      <ProductFilterController dimensions={dimensions ?? undefined} />
    </ProductFilterSidebarLayout>
  );
}
