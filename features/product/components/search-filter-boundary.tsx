import { getSearchProductDimensionFilter } from "../api";
import { ProductFilterController } from "./filters/product-filter-controller";
import { ProductFilterSidebarLayout } from "./filters/product-filter-sidebar-layout";

export default async function SearchFilterBoundary({ query }: { query: string }) {
  const dimensions = await getSearchProductDimensionFilter(query);
  return (
    <ProductFilterSidebarLayout>
      <ProductFilterController dimensions={dimensions} />
    </ProductFilterSidebarLayout>
  );
}
