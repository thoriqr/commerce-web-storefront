import { ProductDetail } from "@/features/product/components/product-detail";
import { getProductBySlug } from "@/features/product/api";
import { truncate } from "@/lib/truncate";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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

  await queryClient.prefetchQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        <ProductDetail slug={slug} variantId={variant} />
      </div>
    </HydrationBoundary>
  );
}
