import { ApiError } from "@/lib/types";

export function extractFieldError(error: ApiError | undefined, field: string) {
  return error?.errors?.find((e) => e.field === field)?.message;
}
