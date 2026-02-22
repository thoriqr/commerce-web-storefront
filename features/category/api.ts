import { apiFetch } from "@/lib/api";
import { CategoryDetail, CategoryTopLevel, CategoryTree } from "./types";
import { DimensionFilter } from "../product/types";

const BASE_URL = "/categories";

export async function getCategoryTree() {
  return apiFetch<CategoryTree[]>(`${BASE_URL}/mega-menu`);
}

export async function getPopularCategories() {
  return apiFetch<CategoryTopLevel[]>(`${BASE_URL}/popular`);
}

export async function getCategoryDetail(slugPath: string) {
  return apiFetch<CategoryDetail>(`${BASE_URL}/detail?slugPath=${slugPath}`);
}

export async function getCategoryDimensionFilter(slugPath: string) {
  return apiFetch<DimensionFilter[]>(`${BASE_URL}/filters?slugPath=${slugPath}`);
}
