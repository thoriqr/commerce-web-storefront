"use client";

import { useSearchParams } from "next/navigation";
import { useListingFilterController } from "../hooks/use-listing-filter-controller";
import { buildListingParams } from "../utils/build-listing-params";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductListing } from "../types";
import { getProductsBySearch } from "../api";
import { ProductGridSkeleton } from "./skeletons/product-grid-skeleton";
import { ProductListError } from "./product-list-error";
import { ProductListEmpty } from "./product-list-empty";
import { ProductGrid } from "./product-grid";

export default function SearchProductList({ query }: { query: string }) {
  const searchParams = useSearchParams();

  const { resetAll } = useListingFilterController({
    mode: "instant"
  });

  const listingParams = buildListingParams(new URLSearchParams(searchParams.toString()));

  const queryKey = ["search-products", query, JSON.stringify(listingParams)];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, refetch } = useInfiniteQuery<ProductListing>({
    queryKey,
    queryFn: ({ pageParam }) =>
      getProductsBySearch(query, {
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
