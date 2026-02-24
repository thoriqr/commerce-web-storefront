import { apiFetch } from "@/lib/api";
import { ProductDetail, ProductListing, ProductListingQueryParams, ProductVariantDetail } from "./types";

const BASE_URL = "/products";

export async function getProductsByCategory(slugPath: string, params?: ProductListingQueryParams) {
  const search = new URLSearchParams();

  search.set("slugPath", slugPath);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        search.set(key, value.join(","));
      } else {
        search.set(key, String(value));
      }
    });
  }

  return apiFetch<ProductListing>(`/products/by-category?${search.toString()}`);
}

export async function getProductsByCollection(slug: string) {
  return apiFetch<ProductListing>(`${BASE_URL}/by-collection?slug=${slug}`);
}

export async function getProductsBySearch(q: string) {
  return apiFetch<ProductListing>(`${BASE_URL}/by-search?q=${q}`);
}

export async function getProductBySlug(slug: string) {
  return apiFetch<ProductDetail>(`${BASE_URL}/${slug}`);
}

export async function getVariantByProductSlugAndVariantId(productSlug: string, variantId: number) {
  return apiFetch<ProductVariantDetail>(`${BASE_URL}/${productSlug}/variants/${variantId}`);
}
