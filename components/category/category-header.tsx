import { CategoryBreadcrumb } from "./category-breadcrumb";
import { SubcategoryGrid } from "./subcategory-grid";
import { findCategoryBySlugPath } from "@/lib/category/category-tree";
import { notFound } from "next/navigation";
import { mockCategories } from "@/lib/category/mock/mock-categories";

type Props = {
  slug: string[];
};

export default async function CategoryHeader({ slug }: Props) {
  // fetch in here
  const currentCategory = findCategoryBySlugPath(mockCategories, slug);

  if (!currentCategory) {
    return notFound();
  }

  const categoryName = slug[slug.length - 1].replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const subcategories = currentCategory.children ?? [];

  return (
    <>
      <CategoryBreadcrumb slug={slug} />
      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold">{categoryName}</h1>
        <p className="text-sm text-muted-foreground">Showing products in {categoryName}</p>
      </div>

      <SubcategoryGrid parentSlugPath={slug} categories={subcategories} />
    </>
  );
}
