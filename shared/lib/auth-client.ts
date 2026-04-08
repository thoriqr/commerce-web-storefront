import axios, { AxiosError, AxiosRequestConfig } from "axios";

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
    const originalRequest = error.config as CustomConfig;

    //  No response means network error (do not handle here)
    if (!error.response) {
      return Promise.reject(error);
    }

    // Only handle 401 (Unauthorized)
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    const url = originalRequest?.url || "";

    // Skip refresh logic if explicitly disabled
    if (originalRequest?.skipAuthRefresh) {
      return Promise.reject(error);
    }

    //  Do not intercept auth-refresh
    if (url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // Prevent infinite retry loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Ensure a single refresh request (avoid race condition)
      if (!refreshPromise) {
        const p = refreshToken();
        refreshPromise = p.finally(() => {
          refreshPromise = null;
        });
      }

      // Wait for refresh to complete
      await refreshPromise;

      // Retry the original request with updated credentials
      return authClient(originalRequest);
    } catch (err) {
      //  Refresh failed → let the caller handle it
      return Promise.reject(err);
    }
  }
);
