import { getCategoryDetail } from "@/features/category/api";
import CategoryHeader from "@/features/category/components/category-header";
import { CategoryHeaderSkeleton } from "@/features/category/components/category-header-skeleton";
import { CategoryProducts } from "@/features/category/components/category-products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryDetail(slug.join("/"));

  const title = category.category.name;
  const description = category.category.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description
    }
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      <Suspense fallback={<CategoryHeaderSkeleton />}>
        <CategoryHeader slug={slug} />
      </Suspense>

      <CategoryProducts slug={slug} />
    </div>
  );
}
