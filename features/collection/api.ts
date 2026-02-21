import { apiFetch } from "@/lib/api";
import { CollectionPreview } from "./types";

const BASE_URL = "/collections";

export async function getCollectionPreview() {
  return apiFetch<CollectionPreview[]>(`${BASE_URL}/preview`);
}
