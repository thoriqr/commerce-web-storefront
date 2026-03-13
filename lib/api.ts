import { notFound } from "next/navigation";
import { ApiError, ApiResult } from "./types";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL!}`;
const STORE_URL = `${process.env.NEXT_PUBLIC_API_URL!}/store`;

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${STORE_URL}${path}`, options);

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`API request failed: ${res.status}`);

  const json = await res.json();
  return json.data as T;
}

export async function apiRequest<T>(path: string, options: RequestInit): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      },
      ...options
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      const error: ApiError = json?.error ?? {
        message: "Something went wrong"
      };

      return { ok: false, error };
    }

    return { ok: true, data: json?.data as T };
  } catch {
    return {
      ok: false,
      error: { message: "Network error. Please try again." }
    };
  }
}
