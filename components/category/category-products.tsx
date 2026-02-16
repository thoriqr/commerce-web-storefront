import { mockDimensions } from "@/lib/products/mock-dimensions";
import { ProductListingLayout } from "../products/product-listing-layout";
import { mockProducts } from "@/lib/products/mock-products";

export async function CategoryProducts({ slug }: { slug: string[] }) {
  // fetch product by slug
  // fetch dimension

  return <ProductListingLayout dimensions={mockDimensions} products={mockProducts} />;
}
