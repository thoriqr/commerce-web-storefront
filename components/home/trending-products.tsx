import Link from "next/link";
import { Button } from "../ui/button";
import { ProductCard } from "../products/product-card";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
};

type Props = {
  title: string;
  products: Product[];
  viewAllHref?: string;
};

export function TrendingProducts({ title, products, viewAllHref = "/products" }: Props) {
  const limitedProducts = products.slice(0, 8);

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>

        <Link href={viewAllHref}>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </Link>
      </div>

      {/* Static Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {limitedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
