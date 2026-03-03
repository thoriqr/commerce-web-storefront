import { notFound } from "next/navigation";

const STORE_URL = `${process.env.NEXT_PUBLIC_API_URL!}/store`;

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${STORE_URL}${path}`, options);

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`API request failed: ${res.status}`);

  const json = await res.json();
  return json.data as T;
}
