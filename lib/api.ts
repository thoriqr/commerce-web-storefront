import { notFound } from "next/navigation";
import { ApiError, ApiResult, FetchError } from "./types";

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

      return { ok: false, status: res.status, error };
    }

    return { ok: true, status: res.status, data: json?.data as T };
  } catch {
    return {
      ok: false,
      status: 500,
      error: { message: "Network error. Please try again." }
    };
  }
}

export async function fetchJson<T>(path: string, retry = true): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include"
  });

  const json = await res.json().catch(() => null);

  // HANDLE 401 (WITH RETRY)
  if (res.status === 401 && retry) {
    // retry one more
    return fetchJson<T>(path, false);
  }

  // redirect
  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }

    const error: FetchError = new Error("Unauthorized");
    error.status = 401;
    throw error;
  }

  if (!res.ok) {
    const error: FetchError = new Error(json?.error?.message ?? "Request failed");
    error.status = res.status;
    throw error;
  }

  return json.data as T;
}
