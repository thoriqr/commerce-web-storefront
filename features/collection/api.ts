import { apiFetch } from "@/lib/api";
import { CollectionDetail, CollectionPreview } from "./types";

const BASE_URL = "/collections";

export async function getCollectionPreview() {
  return apiFetch<CollectionPreview[]>(`${BASE_URL}/preview`);
}

export async function getCollectionDetail(slug: string) {
  return apiFetch<CollectionDetail>(`${BASE_URL}/${slug}`);
}
