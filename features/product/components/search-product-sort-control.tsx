"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PRODUCT_SORT_MAP, PRODUCT_SORT_OPTIONS, ProductSortKey } from "../constants/product-sort";
import { ProductSortSelect } from "./filters/product-sort-select";

export default function SearchProductSortControl() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sortBy = searchParams.get("sortBy") ?? "created_at";
  const sortDir = searchParams.get("sortDir") ?? "desc";

  const currentSort =
    (Object.entries(PRODUCT_SORT_MAP).find(([, value]) => value.sortBy === sortBy && value.sortDir === sortDir)?.[0] as ProductSortKey) ?? "latest";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const { sortBy, sortDir } = PRODUCT_SORT_MAP[value as ProductSortKey];

    params.set("sortBy", sortBy);
    params.set("sortDir", sortDir);

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return <ProductSortSelect value={currentSort} options={PRODUCT_SORT_OPTIONS} onChange={handleChange} />;
}
