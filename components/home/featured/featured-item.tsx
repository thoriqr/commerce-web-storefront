import { Button } from "@/components/ui/button";
import { CollectionPreview } from "@/features/collection/types";
import { ProductCarousel } from "@/features/product/components/product-carousel";
import Link from "next/link";

type Props = {
  collection: CollectionPreview;
};

export default function FeaturedItem({ collection }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link href={`/collection/${collection.slug}`} className="text-xl font-semibold">
          {collection.name}
        </Link>

        {collection.hasMoreProducts && (
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/collection/${collection.slug}`}>View all</Link>
          </Button>
        )}
      </div>
      <ProductCarousel products={collection.products} />
    </div>
  );
}
