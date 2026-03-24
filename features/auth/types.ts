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

export type ConfirmEmailInput = { token: string };

export type SetPasswordInput = {
  password: string;
};

export type MeResponse = {
  id: number;
  email: string;
  displayName: string | null;
};
