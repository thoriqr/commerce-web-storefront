import { ApiErrorResponse } from "@/shared/types/api-error";

export function extractFieldError(error: ApiErrorResponse | undefined, field: string) {
  return error?.errors?.find((e) => e.field === field)?.message;
}
