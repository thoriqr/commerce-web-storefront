import axios, { AxiosRequestConfig } from "axios";
import { ApiErrorResponse, FetchError } from "../types/api-error";
import { authClient } from "./auth-client";

function parseApiError(data: unknown): ApiErrorResponse | undefined {
  if (typeof data === "object" && data !== null && "error" in data) {
    return (data as { error?: ApiErrorResponse }).error;
  }
  return undefined;
}

export async function authRequest<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const res = await authClient.request<{ data: T }>(config);
    return res.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status ?? 500;
      const apiErr = parseApiError(err.response?.data);

      throw new FetchError(apiErr?.message ?? err.message, status, {
        code: apiErr?.code,
        fields: apiErr?.errors
      });
    }

    throw err;
  }
}

export async function authRequestWithMeta<T, M = unknown>(config: AxiosRequestConfig): Promise<{ data: T; meta?: M }> {
  try {
    const res = await authClient.request<{ data: T; meta?: M }>(config);

    return {
      data: res.data.data,
      meta: res.data.meta
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status ?? 500;
      const apiErr = parseApiError(err.response?.data);

      throw new FetchError(apiErr?.message ?? err.message, status, {
        code: apiErr?.code,
        fields: apiErr?.errors
      });
    }

    throw err;
  }
}
