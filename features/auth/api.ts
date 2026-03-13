import { MeResponse } from "@/lib/types";
import type { LoginInput, RegisterInput, VerifyEmailInput, ResetPasswordInput, ChangePasswordInput, SetPasswordInput } from "./types";
import { apiRequest } from "@/lib/api";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL!}/auth`;
const AUTH_URL = "/auth";

export function loginRequest(input: LoginInput) {
  return apiRequest<void>(`${AUTH_URL}/login`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function registerRequest(input: RegisterInput) {
  return apiRequest<void>(`${AUTH_URL}/register`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function verifyEmailConfirm(input: VerifyEmailInput) {
  return apiRequest<void>(`${AUTH_URL}/verify-email`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function resetPasswordRequest(input: RegisterInput) {
  return apiRequest<void>(`${AUTH_URL}/request-reset-password`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function resetPasswordConfirm(input: ResetPasswordInput) {
  return apiRequest<void>(`${AUTH_URL}/reset-password`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function setPasswordRequest(input: SetPasswordInput) {
  return apiRequest<void>(`${AUTH_URL}/set-password`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function changePasswordRequest(input: ChangePasswordInput) {
  return apiRequest<void>(`${AUTH_URL}/change-password`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function googleLoginRequest(idToken: string) {
  return apiRequest<void>(`${AUTH_URL}/google`, {
    method: "POST",
    body: JSON.stringify({
      idToken
    })
  });
}

export async function logoutRequest(): Promise<void> {
  await apiRequest<void>(`${AUTH_URL}/logout`, {
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
