import { ProductMobileTopBar } from "@/features/product/components/filters/product-mobile-topbar";
import { getCategoryDimensionFilter } from "../api";
import { CategorySortControl } from "./category-sort-control";
import { ProductFilterDrawerController } from "@/features/product/components/filters/product-filter-drawer-controller";

export default async function CategoryMobileTopBarBoundary({ slugPath }: { slugPath: string }) {
  const dimensions = await getCategoryDimensionFilter(slugPath);

  return <ProductMobileTopBar filterContent={<ProductFilterDrawerController dimensions={dimensions} />} sortControl={<CategorySortControl />} />;
}
