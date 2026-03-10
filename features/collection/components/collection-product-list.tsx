"use client";

import { getProductsByCollection } from "@/features/product/api";
import { ProductGrid } from "@/features/product/components/product-grid";
import { ProductListEmpty } from "@/features/product/components/product-list-empty";
import { ProductListError } from "@/features/product/components/product-list-error";
import { ProductGridSkeleton } from "@/features/product/components/skeletons/product-grid-skeleton";
import { useListingFilterController } from "@/features/product/hooks/use-listing-filter-controller";
import { ProductListing } from "@/features/product/types";
import { buildListingParams } from "@/features/product/utils/build-listing-params";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function CollectionProductList({ slug }: { slug: string }) {
  const searchParams = useSearchParams();

  const { resetAll } = useListingFilterController({
    mode: "instant"
  });

  const listingParams = buildListingParams(new URLSearchParams(searchParams.toString()));

  const queryKey = ["collection-products", slug, JSON.stringify(listingParams)];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, refetch } = useInfiniteQuery<ProductListing>({
    queryKey,
    queryFn: ({ pageParam }) =>
      getProductsByCollection(slug, {
        ...listingParams,
        cursor: pageParam as string | undefined
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined
  });

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (isError) {
    return <ProductListError message={(error as Error)?.message} onRetry={() => refetch()} onResetFilters={resetAll} />;
  }

  const products = data?.pages.flatMap((page) => page.items) ?? [];

  if (products.length === 0) {
    return <ProductListEmpty onResetFilters={resetAll} />;
  }

  return <ProductGrid products={products} hasMore={hasNextPage} onLoadMore={fetchNextPage} isLoadingMore={isFetchingNextPage} />;
}
