import { getCollectionPreview } from "@/features/collection/api";
import FeaturedItem from "./featured-item";
import { Suspense } from "react";
import FeaturedSkeleton from "./featured-skeleton";

export async function FeaturedContent() {
  const collections = await getCollectionPreview();

  if (!collections || collections.length === 0) {
    return null;
  }
  return (
    <section className="space-y-12">
      {collections.map((collection) => (
        <FeaturedItem key={collection.id} collection={collection} />
      ))}
    </section>
  );
}

export function FeaturedSection() {
  return (
    <Suspense fallback={<FeaturedSkeleton />}>
      <FeaturedContent />
    </Suspense>
  );
}
