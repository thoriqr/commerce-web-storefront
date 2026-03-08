import { apiFetch } from "@/lib/api";
import { DimensionFilter, ProductDetail, ProductListing, ProductListingQueryParams, ProductVariantDetail } from "./types";
import { appendQueryParams } from "./utils/append-query-params";

const BASE_URL = "/products";

export async function getProductsByCategory(slugPath: string, params?: ProductListingQueryParams) {
  const search = new URLSearchParams();

  search.set("slugPath", slugPath);

  appendQueryParams(search, params);

  return apiFetch<ProductListing>(`/products/by-category?${search.toString()}`);
}

export async function getProductsBySearch(q: string, params?: ProductListingQueryParams) {
  const search = new URLSearchParams();

  search.set("q", q);

  appendQueryParams(search, params);

  return apiFetch<ProductListing>(`${BASE_URL}/by-search?${search.toString()}`);
}

export async function getProductsByCollection(slug: string) {
  return apiFetch<ProductListing>(`${BASE_URL}/by-collection?slug=${slug}`);
}

export async function getProductBySlug(slug: string) {
  return apiFetch<ProductDetail>(`${BASE_URL}/${slug}`);
}

export async function getVariantByProductSlugAndVariantId(productSlug: string, variantId: number) {
  return apiFetch<ProductVariantDetail>(`${BASE_URL}/${productSlug}/variants/${variantId}`);
}

export async function getSearchProductDimensionFilter(query: string) {
  return apiFetch<DimensionFilter[]>(`${BASE_URL}/filters?q=${query}`);
}
