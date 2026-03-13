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
  hasPassword: boolean;
  displayName: string | null;
  providers: UserProvider[];
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

export type ApiResult<T = void> = { ok: true; data?: T } | { ok: false; error: ApiError };
