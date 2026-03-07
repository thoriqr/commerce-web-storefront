import { MeResponse } from "@/lib/types";
import type {
  ApiResult,
  ApiError,
  LoginInput,
  RegisterInput,
  VerifyEmailInput,
  ResetPasswordInput,
  ChangePasswordInput,
  ChangeEmailInput,
  ConfirmEmailInput,
  SetPasswordInput
} from "./types";

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

export function registerRequest(input: RegisterInput) {
  return authApiRequest("/register", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function verifyEmailConfirm(input: VerifyEmailInput) {
  return authApiRequest("/verify-email", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function resetPasswordRequest(input: RegisterInput) {
  return authApiRequest("/request-password-reset", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function resetPasswordConfirm(input: ResetPasswordInput) {
  return authApiRequest("/reset-password", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function setPasswordRequest(input: SetPasswordInput) {
  return authApiRequest("/set-password", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function changePasswordRequest(input: ChangePasswordInput) {
  return authApiRequest("/change-password", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function changeEmailRequest(input: ChangeEmailInput) {
  return authApiRequest("/change-email", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function confirmEmailChange(input: ConfirmEmailInput) {
  return authApiRequest("/confirm-email-change", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function googleLoginRequest(idToken: string) {
  return authApiRequest("/google", {
    method: "POST",
    body: JSON.stringify({
      idToken
    })
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
