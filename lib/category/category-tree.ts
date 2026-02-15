import { Category } from "./types";

export function findCategoryBySlugPath(categories: Category[], slugPath: string[]): Category | null {
  let currentLevel = categories;
  let currentCategory: Category | null = null;

  for (const slug of slugPath) {
    currentCategory = currentLevel.find((c) => c.slug === slug) ?? null;
    if (!currentCategory) return null;
    currentLevel = currentCategory.children ?? [];
  }

  return currentCategory;
}
