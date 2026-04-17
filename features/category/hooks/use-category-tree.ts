import { useQuery } from "@tanstack/react-query";
import { getCategoryTree } from "../api";

export function useCategoryTree(enabled?: boolean) {
  return useQuery({
    queryKey: ["category-tree"],
    queryFn: getCategoryTree,
    enabled
  });
}
