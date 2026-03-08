import { CategoryBreadcrumb } from "./category-breadcrumb";
import { SubcategoryGrid } from "@/features/category/components/subcategory-grid";
import { getCategoryDetail } from "@/features/category/api";

type Props = {
  slug: string[];
};

export default async function CategoryHeader({ slug }: Props) {
  const category = await getCategoryDetail(slug.join("/"));

  const subcategories = category.children ?? [];

  return (
    <>
      <CategoryBreadcrumb breadcrumb={category.breadcrumb} />
      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold">{category.category.name}</h1>
        <p className="text-sm text-muted-foreground">Showing products in {category.category.name}</p>
      </div>

      <SubcategoryGrid categories={subcategories} />
    </>
  );
}
