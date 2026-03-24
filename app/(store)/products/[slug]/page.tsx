import { ProductDetail } from "@/features/product/components/product-detail";
import { getProductOrFail, getVariantByProductSlugAndVariantId } from "@/features/product/api";
import { truncate } from "@/lib/truncate";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductOrFail(slug);

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

  const { slug } = await params;
  const { variant } = await searchParams;

  // prefetch product
  const product = await queryClient.fetchQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductOrFail(slug)
  });

  // resolve active variant
  const activeVariantId = variant ?? String(product.initialVariantId);

  const isValidVariant = product.variants.some((v) => v.id === Number(activeVariantId));

  const finalVariantId = isValidVariant ? activeVariantId : String(product.initialVariantId);

  // prefetch variant
  await queryClient.prefetchQuery({
    queryKey: ["variant", slug, activeVariantId],
    queryFn: () => getVariantByProductSlugAndVariantId(slug, Number(finalVariantId))
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        <ProductDetail slug={slug} activeVariantId={finalVariantId} />
      </div>
    </HydrationBoundary>
  );
}
