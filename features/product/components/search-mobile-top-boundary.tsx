import { getSearchProductDimensionFilter } from "../api";
import { ProductFilterDrawerController } from "./filters/product-filter-drawer-controller";
import { ProductMobileTopBar } from "./filters/product-mobile-topbar";
import SearchProductSortControl from "./search-product-sort-control";

export default async function SearchMobileTopBoundary({ query }: { query: string }) {
  const dimensions = await getSearchProductDimensionFilter(query);

  return (
    <ProductMobileTopBar
      filterContent={<ProductFilterDrawerController dimensions={dimensions ?? undefined} />}
      sortControl={<SearchProductSortControl />}
    />
  );
}
