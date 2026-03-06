export type ApiFieldError = {
  field: string;
  message: string;
};

export type ApiError = {
  code?: string;
  message: string;
  errors?: ApiFieldError[];
};

export type ApiResult = { ok: true } | { ok: false; error: ApiError };

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  email: string;
};

export type VerifyEmailInput = {
  token: string;
  displayName: string;
  password: string;
};

export type ResetPasswordInput = {
  token: string;
  password: string;
};

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};

export type ChangeEmailInput = {
  email: string;
};

export type ConfirmEmailInput = { token: string };

export type SetPasswordInput = {
  password: string;
};
