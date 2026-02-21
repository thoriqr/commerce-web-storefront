import Link from "next/link";
import { Category } from "../types";

type Props = {
  categories: Category[];
};

export function SubcategoryGrid({ categories }: Props) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Subcategories</h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slugPath}`}
            className="rounded-md border bg-muted/40 p-4 text-sm transition hover:bg-muted"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
