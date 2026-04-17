import { CategoryDetail, CategoryTopLevel, CategoryTree } from "./types";
import { DimensionFilter } from "../product/types";
import { fetchServer } from "@/shared/lib/fetch-server";
import { fetchStore } from "@/shared/lib/fetch-store";

const BASE_URL = "/categories";

export async function getCategoryTree() {
  return fetchStore<CategoryTree[]>(`${BASE_URL}/mega-menu`);
}

export async function getPopularCategories() {
  return fetchServer<CategoryTopLevel[]>(`${BASE_URL}/popular`);
}

export async function getCategoryDetail(slugPath: string) {
  return fetchServer<CategoryDetail>(`${BASE_URL}/detail?slugPath=${slugPath}`);
}

export async function getCategoryDimensionFilter(slugPath: string) {
  return fetchServer<DimensionFilter[]>(`${BASE_URL}/filters?slugPath=${slugPath}`);
}
