export function appendQueryParams(search: URLSearchParams, params?: Record<string, unknown>) {
  if (!params) return;

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      search.set(key, value.join(","));
    } else {
      search.set(key, String(value));
    }
  });
}
