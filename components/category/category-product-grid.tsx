"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../products/product-card";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
};

type Props = {
  products: Product[];
};

const INITIAL_COUNT = 8;
const LOAD_MORE_STEP = 8;

export function CategoryProductGrid({ products }: Props) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
