"use client";

import SearchProductSortControl from "./search-product-sort-control";

export default function SearchDesktopSort() {
  return (
    <div className="hidden md:flex justify-end">
      <SearchProductSortControl />
    </div>
  );
}
