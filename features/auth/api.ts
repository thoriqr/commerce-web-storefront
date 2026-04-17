import { authRequest } from "@/shared/lib/auth-request";
import type {
  RegisterInput,
  VerifyEmailInput,
  ResetPasswordInput,
  ChangePasswordInput,
  SetPasswordInput,
  MeResponse,
  VerificationToken
} from "./types";
import { fetchAction } from "@/shared/lib/fetch-action";
import { EmailFormSchema, LoginFormSchema } from "./schema";

const AUTH_URL = "/auth";

export function loginRequest(input: LoginFormSchema) {
  return fetchAction<void>(`${AUTH_URL}/login`, {
    method: "POST",
    body: JSON.stringify(input),
    withAuth: true
  });
}

export function logoutRequest(): Promise<void> {
  return fetchAction<void>(`${AUTH_URL}/logout`, {
    method: "POST",
    withAuth: true
  });
}

export async function fetchMe() {
  return authRequest<MeResponse>({
    url: `${AUTH_URL}/me`,
    method: "GET"
  });
}

export function registerRequest(input: EmailFormSchema) {
  return fetchAction<void>(`${AUTH_URL}/register`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function verifyEmailConfirm(input: VerifyEmailInput) {
  return fetchAction<void>(`${AUTH_URL}/verify-email`, {
    method: "POST",
    body: JSON.stringify(input),
    withAuth: true
  });
}

export function resetPasswordRequest(input: RegisterInput) {
  return fetchAction<void>(`${AUTH_URL}/request-password-reset`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function resetPasswordConfirm(input: ResetPasswordInput) {
  return fetchAction<void>(`${AUTH_URL}/reset-password`, {
    method: "POST",
    body: JSON.stringify(input),
    withAuth: true
  });
}

export function setPasswordRequest(input: SetPasswordInput) {
  return fetchAction<void>(`${AUTH_URL}/set-password`, {
    method: "POST",
    body: JSON.stringify(input),
    withAuth: true
  });
}

export function changePasswordRequest(input: ChangePasswordInput) {
  return fetchAction<void>(`${AUTH_URL}/change-password`, {
    method: "POST",
    body: JSON.stringify(input),
    withAuth: true
  });
}

export function googleLoginRequest(idToken: string) {
  return fetchAction<void>(`${AUTH_URL}/google`, {
    method: "POST",
    body: JSON.stringify({
      idToken
    }),
    withAuth: true
  });
}

export function verificationToken(payload: VerificationToken) {
  return fetchAction<{ expiresAt: Date }>(`${AUTH_URL}/check-verification-token`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
