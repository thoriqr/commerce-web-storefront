import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { parseApiError } from "./parse-api-error";
import { ERROR_CODES } from "@/features/auth/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type CustomConfig = AxiosRequestConfig & {
  skipAuthRefresh?: boolean;
  _retry?: boolean;
};

export const authClient = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

let refreshPromise: Promise<void> | null = null;

async function refreshToken() {
  await authClient.post("/auth/refresh");
}

authClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as CustomConfig | undefined;

    // No response means network error.
    if (!error.response) {
      return Promise.reject(error);
    }

    // Only handle HTTP 401.
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Guard against malformed/unexpected API error responses.
    const apiError = parseApiError(error.response.data);

    if (!apiError) {
      return Promise.reject(error);
    }

    // Only an expired access token can trigger a refresh.
    if (apiError.code !== ERROR_CODES.accessTokenExpired) {
      return Promise.reject(error);
    }

    // If Axios does not provide the original request, do not retry.
    if (!originalRequest) {
      return Promise.reject(error);
    }

    const url = originalRequest.url ?? "";

    // Skip refresh logic if explicitly disabled.
    if (originalRequest.skipAuthRefresh) {
      return Promise.reject(error);
    }

    // Never intercept the refresh request itself.
    if (url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // Prevent the same request from being retried more than once.
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Ensure only one refresh request is running at a time.
      if (!refreshPromise) {
        const promise = refreshToken();

        refreshPromise = promise.finally(() => {
          refreshPromise = null;
        });
      }

      // Wait for the current refresh request.
      await refreshPromise;

      // Retry the original request with the refreshed session.
      return authClient(originalRequest);
    } catch (refreshError) {
      // Refresh failed.
      // Do not retry the original request again.
      return Promise.reject(refreshError);
    }
  }
);
