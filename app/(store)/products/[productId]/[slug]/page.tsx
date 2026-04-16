import { ProductDetail } from "@/features/product/components/product-detail";
import { getProductByIdOrFail, getVariantByProductIdAndVariantId } from "@/features/product/api";
import { truncate } from "@/shared/utils/truncate";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ productId: string; slug: string }>;
  searchParams: Promise<{ variant?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProductByIdOrFail(Number(productId));

  const title = product.name;
  const description = truncate(product.description, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description
    }
  };
}

export default async function ProductPage({ params, searchParams }: Props) {
  const queryClient = new QueryClient();

  const { productId, slug } = await params;
  const { variant } = await searchParams;

  // prefetch product
  const product = await queryClient.fetchQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductByIdOrFail(Number(productId))
  });

  // redirect if slug mismatch
  if (slug !== product.slug) {
    redirect(`/products/${product.id}/${product.slug}`);
  }

  // resolve active variant
  const activeVariantId = variant ?? String(product.initialVariantId);

  const isValidVariant = product.variants.some((v) => v.id === Number(activeVariantId));

  const finalVariantId = isValidVariant ? activeVariantId : String(product.initialVariantId);

  // prefetch variant
  await queryClient.prefetchQuery({
    queryKey: ["variant", productId, activeVariantId],
    queryFn: () => getVariantByProductIdAndVariantId(Number(productId), Number(finalVariantId))
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        <ProductDetail activeVariantId={finalVariantId} productId={Number(productId)} />
      </div>
    </HydrationBoundary>
  );
}
