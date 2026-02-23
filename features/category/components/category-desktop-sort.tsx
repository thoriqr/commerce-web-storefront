"use client";

import { CategorySortControl } from "./category-sort-control";

export default function CategoryDesktopSort() {
  return (
    <div className="hidden md:flex justify-end">
      <CategorySortControl />
    </div>
  );
}
