import { ProductDetail } from "@/components/products/product-detail";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string }>;
};

export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { variant } = await searchParams;

  if (!slug) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      <ProductDetail slug={slug} variantId={variant} />
    </div>
  );
}
