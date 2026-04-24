import { CollectionDetail, CollectionPreview } from "./types";
import { fetchServer } from "@/shared/lib/fetch-server";
import { notFound } from "next/navigation";

const BASE_URL = "/collections";

export async function getCollectionPreview() {
  return fetchServer<CollectionPreview[]>(`${BASE_URL}/preview`, {
    revalidate: 60
  });
}

export async function getCollectionDetail(slug: string): Promise<CollectionDetail> {
  const data = await fetchServer<CollectionDetail>(`${BASE_URL}/${slug}`, {
    revalidate: 60
  });

  if (!data) notFound();

  return data;
}
