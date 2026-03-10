"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { COLLECTION_SORT_MAP, COLLECTION_SORT_OPTIONS, CollectionSortKey } from "../constants/collection-sort";
import { ProductSortSelect } from "@/features/product/components/filters/product-sort-select";

export default function CollectionSortControl() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sortBy = searchParams.get("sortBy") ?? "created_at";
  const sortDir = searchParams.get("sortDir") ?? "desc";

  const currentSort =
    (Object.entries(COLLECTION_SORT_MAP).find(([, value]) => value.sortBy === sortBy && value.sortDir === sortDir)?.[0] as CollectionSortKey) ??
    "latest";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const { sortBy, sortDir } = COLLECTION_SORT_MAP[value as CollectionSortKey];

    params.set("sortBy", sortBy);
    params.set("sortDir", sortDir);

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return <ProductSortSelect value={currentSort} options={COLLECTION_SORT_OPTIONS} onChange={handleChange} />;
}
