export type Provider = "GOOGLE" | "GITHUB";

export type UserProvider = {
  provider: Provider;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
};

export type MeResponse = {
  id: number;
  email: string;
  displayName: string | null;
};

export type ApiFieldError = {
  field: string;
  message: string;
};

export type ApiError = {
  code?: string;
  message: string;
  errors?: ApiFieldError[];
};

export type ApiResult<T = void> = { ok: true; status: number; data?: T } | { ok: false; status: number; error: ApiError };

export type FetchError = Error & { status?: number };
