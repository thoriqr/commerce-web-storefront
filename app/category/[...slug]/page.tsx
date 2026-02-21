import CategoryHeader from "@/components/category/category-header";
import { CategoryHeaderSkeleton } from "@/features/category/components/category-header-skeleton";
import { CategoryProducts } from "@/components/category/category-products";
import { ProductListingSkeleton } from "@/components/products/product-listing-skeleton";

import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      <Suspense fallback={<CategoryHeaderSkeleton />}>
        {/* <CategoryHeaderSkeleton /> */}
        <CategoryHeader slug={slug} />
      </Suspense>

      <Suspense fallback={<ProductListingSkeleton />}>
        <CategoryProducts slug={slug} />
      </Suspense>
    </div>
  );
}
