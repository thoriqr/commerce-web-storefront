import { getCategoryDimensionFilter } from "../api";
import ProductFilterSidebar from "@/features/product/components/filters/product-filter-sidebar";

export default async function CategoryFilterBoundary({ slugPath }: { slugPath: string }) {
  const dimensions = await getCategoryDimensionFilter(slugPath);

  return <ProductFilterSidebar dimensions={dimensions} />;
}
