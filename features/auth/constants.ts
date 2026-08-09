export const AUTH_SCHEMA = {
  MIN_PASSWORD: 8,
  MAX_PASSWORD: 72
} as const;

export const ERROR_CODES = {
  unauthorized: "UNAUTHORIZED",
  invalidCredentials: "INVALID_CREDENTIALS",

  accessTokenExpired: "ACCESS_TOKEN_EXPIRED",
  invalidAccessToken: "INVALID_ACCESS_TOKEN",

  refreshTokenExpired: "REFRESH_TOKEN_EXPIRED",
  invalidRefreshToken: "INVALID_REFRESH_TOKEN",
  refreshTokenReuse: "REFRESH_TOKEN_REUSE",
  refreshTokenMissing: "REFRESH_TOKEN_MISSING",

  sessionRevoked: "SESSION_REVOKED"
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
