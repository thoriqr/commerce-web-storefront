import { CategoryDetail, CategoryTree, PopularCategory } from "./types";
import { DimensionFilter } from "../product/types";
import { fetchServer } from "@/shared/lib/fetch-server";
import { fetchStore } from "@/shared/lib/fetch-store";
import { notFound } from "next/navigation";

const BASE_URL = "/categories";

export async function getCategoryTree() {
  return fetchStore<CategoryTree[]>(`${BASE_URL}/mega-menu`);
}

export async function getPopularCategories() {
  return fetchServer<PopularCategory[]>(`${BASE_URL}/popular`, {
    noStore: true
  });
}

export async function getCategoryDetail(slugPath: string): Promise<CategoryDetail> {
  const data = await fetchServer<CategoryDetail>(`${BASE_URL}/detail?slugPath=${slugPath}`, {
    noStore: true
  });

  if (!data) {
    notFound();
  }

  return data;
}

export async function getCategoryDimensionFilter(slugPath: string) {
  return fetchServer<DimensionFilter[]>(`${BASE_URL}/filters?slugPath=${slugPath}`, {
    noStore: true
  });
}
