import { notFound } from "next/navigation";

const STORE_URL = `${process.env.NEXT_PUBLIC_API_URL!}/store`;

export async function fetchServer<T>(path: string): Promise<T> {
  const res = await fetch(`${STORE_URL}${path}`);

  const json = await res.json().catch(() => null);

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(json?.error?.message ?? "Request failed");
  }

  return json.data as T;
}
