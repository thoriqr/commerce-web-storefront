"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORY_SORT_OPTIONS, CATEGORY_SORT_MAP, CategorySortKey } from "../constants/category-sort";
import { ProductSortSelect } from "@/features/product/components/filters/product-sort-select";

export function CategorySortControl() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sortBy = searchParams.get("sortBy") ?? "created_at";
  const sortDir = searchParams.get("sortDir") ?? "desc";

  const currentSort =
    (Object.entries(CATEGORY_SORT_MAP).find(([, value]) => value.sortBy === sortBy && value.sortDir === sortDir)?.[0] as CategorySortKey) ?? "latest";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const { sortBy, sortDir } = CATEGORY_SORT_MAP[value as CategorySortKey];

    params.set("sortBy", sortBy);
    params.set("sortDir", sortDir);

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return <ProductSortSelect value={currentSort} options={CATEGORY_SORT_OPTIONS} onChange={handleChange} />;
}
