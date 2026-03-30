import { ApiErrorResponse, FetchError } from "../types/api-error";

export type FetchActionResult<T = void> = { ok: true; data?: T } | { ok: false; error: ApiErrorResponse };

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL!}`;

export async function fetchAction<T>(path: string, options: RequestInit & { withAuth?: boolean }): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      credentials: options.withAuth ? "include" : "omit",
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      const err = json?.error as ApiErrorResponse | undefined;

      throw new FetchError(err?.message ?? "Something went wrong", res.status, {
        code: err?.code,
        fields: err?.errors // (optional future use)
      });
    }

    return json?.data as T;
  } catch (err) {
    if (err instanceof FetchError) {
      throw err;
    }

    throw new FetchError("Network error. Please try again.", 0);
  }
}
