"use client";

import Link from "next/link";

type Category = {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
};

type Props = {
  parentSlugPath: string[];
  categories: Category[];
};

export function SubcategoryGrid({ parentSlugPath, categories }: Props) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Subcategories</h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${[...parentSlugPath, cat.slug].join("/")}`}
            className="rounded-md border bg-muted/40 p-4 text-sm transition hover:bg-muted"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
