import { FetchError, ApiErrorResponse } from "@/shared/types/api-error";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL!}`;

type FetchAuthOptions = RequestInit & {
  retry?: boolean;
};

export async function fetchAuth<T>(path: string, options?: FetchAuthOptions): Promise<T> {
  const { retry = true, ...fetchOptions } = options ?? {};

  const res = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers
    }
  });

  const json = await res.json().catch(() => null);

  // retry once (token refresh)
  if (res.status === 401 && retry) {
    return fetchAuth<T>(path, { ...options, retry: false });
  }

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
