import { apiFetch } from "@/lib/api";
import { CategoryTree } from "./types";

export async function getCategoryTree() {
  return apiFetch<CategoryTree[]>("/categories/mega-menu");
}
