"use client";

import Link from "next/link";

type Category = {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
};

type Props = {
  categories: Category[];
};

export function PopularCategories({ categories }: Props) {
  // ambil root saja
  const roots = categories ?? [];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Popular Categories</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {roots.map((cat) => (
          <Link key={cat.id} href={`/category/${cat.slug}`} className="group rounded-lg border bg-muted/40 p-6 transition hover:bg-muted">
            <div className="space-y-2">
              <h3 className="text-sm font-medium group-hover:underline">{cat.name}</h3>

              {cat.children && cat.children.length > 0 && <p className="text-xs text-muted-foreground">{cat.children.length} subcategories</p>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
