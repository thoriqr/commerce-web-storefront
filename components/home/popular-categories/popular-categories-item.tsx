import { CategoryTopLevel } from "@/features/category/types";
import Link from "next/link";

type Props = {
  category: CategoryTopLevel;
};

export default function PopularCategoriesItem({ category }: Props) {
  return (
    <Link href={`/category/${category.slug}`} className="group rounded-lg border bg-background p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">{category.name}</h3>

        <span className="text-sm text-muted-foreground transition-colors group-hover:text-primary">Explore →</span>
      </div>
    </Link>
  );
}
