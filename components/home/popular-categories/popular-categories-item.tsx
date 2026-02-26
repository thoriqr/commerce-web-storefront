import { CategoryTopLevel } from "@/features/category/types";
import Link from "next/link";

type Props = {
  category: CategoryTopLevel;
};

export default function PopularCategoriesItem({ category }: Props) {
  return (
    <Link href={`/category/${category.slug}`} className="group rounded-lg border bg-background">
      <div className="flex items-start p-4 gap-4 min-w-0">
        <div className="space-y-1 min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold leading-snug line-clamp-2">{category.name}</h3>

          <span className="text-sm text-muted-foreground">Explore →</span>
        </div>
      </div>
    </Link>
  );
}
