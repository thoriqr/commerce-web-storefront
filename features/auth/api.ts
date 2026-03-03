import { MeResponse } from "@/lib/types";
import type { ApiResult, ApiError, LoginInput } from "./types";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL!}/auth`;

async function authApiRequest(path: string, options: RequestInit): Promise<ApiResult> {
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

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: { message: "Network error. Please try again." }
    };
  }
}

export function loginRequest(input: LoginInput): Promise<ApiResult> {
  return authApiRequest("/login", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export async function logoutRequest(): Promise<void> {
  await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include"
  });
}

export async function fetchMe(): Promise<MeResponse | null> {
  try {
    const res = await fetch(`${BASE_URL}/me`, { credentials: "include" });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}
