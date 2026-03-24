import { FetchError, ApiErrorResponse } from "@/shared/types/api-error";

const STORE_URL = `${process.env.NEXT_PUBLIC_API_URL!}/store`;

export async function fetchStore<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${STORE_URL}${path}`, options);

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const err = json?.error as ApiErrorResponse | undefined;

    throw new FetchError(err?.message ?? `Request failed: ${res.status}`, res.status, {
      code: err?.code,
      fields: err?.errors
    });
  }

  return json.data as T;
}
