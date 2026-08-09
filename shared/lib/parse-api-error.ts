import { ApiErrorResponse } from "../types/api-error";

export function parseApiError(data: unknown): ApiErrorResponse | undefined {
  if (typeof data === "object" && data !== null && "error" in data) {
    return (data as { error?: ApiErrorResponse }).error;
  }
  return undefined;
}
