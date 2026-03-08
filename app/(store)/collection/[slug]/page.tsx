import { getCollectionDetail } from "@/features/collection/api";
import CollectionHeader from "@/features/collection/components/collection-header";
import CollectionHeaderSkeleton from "@/features/collection/components/collection-header-skeleton";
import CollectionProducts from "@/features/collection/components/collection-products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionDetail(slug);

  const title = collection.name;
  const description = collection.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description
    }
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      <Suspense fallback={<CollectionHeaderSkeleton />}>
        <CollectionHeader slug={slug} />
      </Suspense>

      <CollectionProducts slug={slug} />
    </div>
  );
}
