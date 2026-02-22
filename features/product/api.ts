import { apiFetch } from "@/lib/api";
import { ProductListing, ProductQueryParams } from "./types";

const BASE_URL = "/products";

export async function getProductsByCategory(slugPath: string, params?: ProductQueryParams) {
  const search = new URLSearchParams();

  search.set("slugPath", slugPath);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
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
