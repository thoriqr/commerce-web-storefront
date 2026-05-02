"use client";

import { getProductsByCategory } from "@/features/product/api";
import { ProductGrid } from "@/features/product/components/product-grid";
import { ProductListEmpty } from "@/features/product/components/product-list-empty";
import { ProductListError } from "@/features/product/components/product-list-error";
import { ProductGridSkeleton } from "@/features/product/components/skeletons/product-grid-skeleton";
import { useListingFilterController } from "@/features/product/hooks/use-listing-filter-controller";
import { buildListingParams } from "@/features/product/utils/build-listing-params";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function CategoryProductList({ slugPath }: { slugPath: string }) {
  const searchParams = useSearchParams();

  const { resetAll } = useListingFilterController({
    mode: "instant"
  });

  const listingParams = buildListingParams(new URLSearchParams(searchParams.toString()));

  const queryKey = ["category-products", slugPath, listingParams];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, refetch } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }: { pageParam?: string | undefined }) =>
      getProductsByCategory(slugPath, {
        ...listingParams,
        cursor: pageParam
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (data) => data?.meta?.nextCursor ?? undefined
  });

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (isError) {
    return <ProductListError message={(error as Error)?.message} onRetry={() => refetch()} onResetFilters={resetAll} />;
  }

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  if (products.length === 0) {
    return <ProductListEmpty onResetFilters={resetAll} />;
  }

  return <ProductGrid products={products} hasMore={hasNextPage} onLoadMore={fetchNextPage} isLoadingMore={isFetchingNextPage} />;
}
