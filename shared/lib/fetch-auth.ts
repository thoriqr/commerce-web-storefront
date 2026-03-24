import { FetchError, ApiErrorResponse } from "@/shared/types/api-error";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL!}`;

export async function fetchAuth<T>(path: string, retry = true): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include"
  });

  const json = await res.json().catch(() => null);

  // retry once (token refresh)
  if (res.status === 401 && retry) {
    return fetchAuth<T>(path, false);
  }

  // still 401 → redirect
  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }

    throw new FetchError("Unauthorized", 401);
  }

  if (!res.ok) {
    const err = json?.error as ApiErrorResponse | undefined;

    throw new FetchError(err?.message ?? `Request failed: ${res.status}`, res.status, {
      code: err?.code,
      fields: err?.errors
    });
  }

  return json.data as T;
}
