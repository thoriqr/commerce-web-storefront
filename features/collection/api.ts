import { CollectionDetail, CollectionPreview } from "./types";
import { fetchServer } from "@/shared/lib/fetch-server";

const BASE_URL = "/collections";

export async function getCollectionPreview() {
  return fetchServer<CollectionPreview[]>(`${BASE_URL}/preview`);
}

export async function getCollectionDetail(slug: string) {
  return fetchServer<CollectionDetail>(`${BASE_URL}/${slug}`);
}
