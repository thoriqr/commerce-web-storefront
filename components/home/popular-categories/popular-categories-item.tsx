import { buttonVariants } from "@/components/ui/button";
import { PopularCategory } from "@/features/category/types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  category: PopularCategory;
};

export default function PopularCategoriesItem({ category }: Props) {
  return (
    <Link
      href={`/category/${category.slugPath}`}
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "justify-between py-3 px-4 group")}
    >
      <span className="truncate">{category.name}</span>

      <ArrowRight className="size-4 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-foreground ease-out" />
    </Link>
  );
}
