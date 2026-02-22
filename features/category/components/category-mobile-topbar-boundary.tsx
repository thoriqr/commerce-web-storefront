import { ProductMobileTopBar } from "@/features/product/components/filters/product-mobile-topbar";
import { getCategoryDimensionFilter } from "../api";

export default async function CategoryMobileTopBarBoundary({ slugPath }: { slugPath: string }) {
  const dimensions = await getCategoryDimensionFilter(slugPath);

  return <ProductMobileTopBar dimensions={dimensions} />;
}
