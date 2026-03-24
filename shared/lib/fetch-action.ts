import { ApiErrorResponse } from "../types/api-error";

export type FetchActionResult<T = void> = { ok: true; data?: T } | { ok: false; error: ApiErrorResponse };

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL!}`;

export async function fetchAction<T>(path: string, options: RequestInit & { withAuth?: boolean }): Promise<FetchActionResult<T>> {
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
      return {
        ok: false,
        error: (json?.error as ApiErrorResponse) ?? {
          message: "Something went wrong"
        }
      };
    }

    return {
      ok: true,
      data: json?.data as T
    };
  } catch {
    return {
      ok: false,
      error: {
        message: "Network error. Please try again."
      }
    };
  }
}
