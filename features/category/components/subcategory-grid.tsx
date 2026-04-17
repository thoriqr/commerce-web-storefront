import Link from "next/link";
import { Category } from "../types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  categories: Category[];
};

export function SubcategoryGrid({ categories }: Props) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Subcategories</h2>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slugPath}`}
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "h-auto py-2 px-3")}
          >
            <span className="truncate">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
