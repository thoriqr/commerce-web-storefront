export type ProductSortKey = "latest" | "priceAsc" | "priceDesc";

export const PRODUCT_SORT_OPTIONS = [
  { label: "Latest", value: "latest" },
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" }
] as const;

export const PRODUCT_SORT_MAP: Record<ProductSortKey, { sortBy: string; sortDir: string }> = {
  latest: { sortBy: "created_at", sortDir: "desc" },
  priceAsc: { sortBy: "price", sortDir: "asc" },
  priceDesc: { sortBy: "price", sortDir: "desc" }
};
