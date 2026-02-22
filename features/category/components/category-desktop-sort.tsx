"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ProductSortSelect } from "@/features/product/components/filters/product-sort-select";

export default function CategoryDesktopSort() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sortBy = searchParams.get("sortBy") ?? "created_at";
  const sortDir = searchParams.get("sortDir") ?? "desc";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "latest") {
      params.set("sortBy", "created_at");
      params.set("sortDir", "desc");
    }

    if (value === "price-asc") {
      params.set("sortBy", "price");
      params.set("sortDir", "asc");
    }

    if (value === "price-desc") {
      params.set("sortBy", "price");
      params.set("sortDir", "desc");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="hidden md:flex justify-end">
      <ProductSortSelect value={`${sortBy}-${sortDir}`} onChange={handleChange} />
    </div>
  );
}
