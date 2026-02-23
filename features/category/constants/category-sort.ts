export type CategorySortKey = "latest" | "priceAsc" | "priceDesc";

export const CATEGORY_SORT_OPTIONS = [
  { label: "Latest", value: "latest" },
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" }
] as const;

export const CATEGORY_SORT_MAP: Record<CategorySortKey, { sortBy: string; sortDir: string }> = {
  latest: { sortBy: "created_at", sortDir: "desc" },
  priceAsc: { sortBy: "price", sortDir: "asc" },
  priceDesc: { sortBy: "price", sortDir: "desc" }
};
