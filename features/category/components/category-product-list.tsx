"use client";

import { getProductsByCategory } from "@/features/product/api";
import { ProductGrid } from "@/features/product/components/product-grid";

import { ProductListEmpty } from "@/features/product/components/product-list-empty";
import { ProductListError } from "@/features/product/components/product-list-error";
import { ProductGridSkeleton } from "@/features/product/components/skeletons/product-grid-skeleton";
import { ProductListing } from "@/features/product/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryProductList({ slugPath }: { slugPath: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryKey = ["category-products", slugPath, searchParams.toString()];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, refetch } = useInfiniteQuery<ProductListing>({
    queryKey,
    queryFn: ({ pageParam }) =>
      getProductsByCategory(slugPath, {
        cursor: pageParam as string | undefined
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined
  });

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (isError) {
    return (
      <ProductListError
        message={(error as Error)?.message}
        onRetry={() => refetch()}
        onResetFilters={() => router.replace(`/category/${slugPath}`)}
      />
    );
  }

  const products = data?.pages.flatMap((page) => page.items) ?? [];

  if (products.length === 0) {
    return <ProductListEmpty onResetFilters={() => router.replace(`/category/${slugPath}`)} />;
  }

  return <ProductGrid products={products} hasMore={hasNextPage} onLoadMore={fetchNextPage} isLoadingMore={isFetchingNextPage} />;
}
