import { DimensionFilter, ProductCard, ProductDetail, ProductListingQueryParams, ProductMeta, ProductVariantDetail } from "./types";
import { appendQueryParams } from "../../shared/utils/append-query-params";
import { fetchStore, fetchStoreWithMeta } from "@/shared/lib/fetch-store";
import { fetchServer } from "@/shared/lib/fetch-server";
import { FetchError } from "@/shared/types/api-error";
import { notFound } from "next/navigation";

const BASE_URL = "/products";

export async function getProductsByCategory(slugPath: string, params?: ProductListingQueryParams) {
  const search = new URLSearchParams();

  search.set("slugPath", slugPath);

  appendQueryParams(search, params);

  return fetchStoreWithMeta<ProductCard[], ProductMeta>(`/products/by-category?${search.toString()}`);
}

export async function getProductsBySearch(q: string, params?: ProductListingQueryParams) {
  const search = new URLSearchParams();

  search.set("q", q);

  appendQueryParams(search, params);

  return fetchStoreWithMeta<ProductCard[], ProductMeta>(`${BASE_URL}/by-search?${search.toString()}`);
}

export async function getProductsByCollection(slug: string, params?: ProductListingQueryParams) {
  const search = new URLSearchParams();

  search.set("slug", slug);

  appendQueryParams(search, params);

  return fetchStoreWithMeta<ProductCard[], ProductMeta>(`${BASE_URL}/by-collection?${search.toString()}`);
}

export async function getProductById(productId: number) {
  return fetchStore<ProductDetail>(`${BASE_URL}/${productId}`, { next: { revalidate: 60 } });
}

export async function getProductByIdOrFail(productId: number) {
  try {
    return await getProductById(productId);
  } catch (err) {
    if (err instanceof FetchError && err.status === 404) {
      notFound();
    }
    throw err;
  }
}

export async function getVariantByProductIdAndVariantId(productId: number, variantId: number) {
  return fetchStore<ProductVariantDetail>(`${BASE_URL}/${productId}/variants/${variantId}`);
}

export async function getSearchProductDimensionFilter(query: string) {
  return fetchServer<DimensionFilter[]>(`${BASE_URL}/filters?q=${query}`, {
    noStore: true
  });
}
