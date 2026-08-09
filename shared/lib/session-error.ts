import { useSessionStore } from "@/shared/stores/session-store";
import { FetchError } from "../types/api-error";
import { ERROR_CODES } from "@/features/auth/constants";
import { QueryClient } from "@tanstack/react-query";
import { clearUserScope } from "../utils/invalidate";

type TerminalSessionErrorCode =
  | typeof ERROR_CODES.refreshTokenExpired
  | typeof ERROR_CODES.invalidRefreshToken
  | typeof ERROR_CODES.refreshTokenReuse
  | typeof ERROR_CODES.refreshTokenMissing
  | typeof ERROR_CODES.sessionRevoked;

const TERMINAL_SESSION_ERROR_CODES = new Set<TerminalSessionErrorCode>([
  ERROR_CODES.refreshTokenExpired,
  ERROR_CODES.invalidRefreshToken,
  ERROR_CODES.refreshTokenReuse,
  ERROR_CODES.refreshTokenMissing,
  ERROR_CODES.sessionRevoked
]);

export function handleSessionError(error: unknown, queryClient: QueryClient): boolean {
  if (!(error instanceof FetchError)) {
    return false;
  }

  const code = error.code as TerminalSessionErrorCode | undefined;

  if (!code || !TERMINAL_SESSION_ERROR_CODES.has(code)) {
    return false;
  }
  clearUserScope(queryClient);
  useSessionStore.getState().showSessionExpired();

  return true;
}
