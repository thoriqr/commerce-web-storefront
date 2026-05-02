import { FetchError, ApiErrorResponse } from "@/shared/types/api-error";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL!}`;

export async function fetchStore<T>(path: string, options?: RequestInit, config?: { useStorePrefix?: boolean }): Promise<T> {
  const useStorePrefix = config?.useStorePrefix ?? true;

  const baseUrl = useStorePrefix ? `${API_URL}/store` : API_URL;

  const res = await fetch(`${baseUrl}${path}`, options);

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

export async function fetchStoreWithMeta<T, M = unknown>(
  path: string,
  options?: RequestInit,
  config?: { useStorePrefix?: boolean }
): Promise<{ data: T; meta?: M }> {
  const useStorePrefix = config?.useStorePrefix ?? true;

  const baseUrl = useStorePrefix ? `${API_URL}/store` : API_URL;

  const res = await fetch(`${baseUrl}${path}`, options);

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const err = json?.error as ApiErrorResponse | undefined;

    throw new FetchError(err?.message ?? `Request failed: ${res.status}`, res.status, {
      code: err?.code,
      fields: err?.errors
    });
  }

  return {
    data: json.data as T,
    meta: json.meta
  };
}
