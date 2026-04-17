import { getPopularCategories } from "@/features/category/api";
import PopularCategoriesItem from "./popular-categories-item";
import { Suspense } from "react";
import { PopularCategoriesSkeleton } from "./popular-categories-skeleton";

export async function PopularCategoriesContent() {
  const categories = await getPopularCategories();

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Popular Categories</h2>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {categories.map((category) => (
          <PopularCategoriesItem key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

export function PopularCategoriesSection() {
  return (
    <Suspense fallback={<PopularCategoriesSkeleton />}>
      <PopularCategoriesContent />
    </Suspense>
  );
}
