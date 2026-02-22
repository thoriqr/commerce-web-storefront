import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";
import { ProductCard as ProductCardType } from "../types";

type Props = {
  products: ProductCardType[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
};

export function ProductGrid({ products, hasMore, onLoadMore, isLoadingMore }: Props) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={onLoadMore} disabled={isLoadingMore}>
            {isLoadingMore ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}
