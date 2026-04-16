const ALLOWED_REDIRECTS = ["/cart"];

export function getSafeRedirect(redirect: string | null) {
  if (!redirect) return "/";

  if (redirect.startsWith("/") && !redirect.startsWith("//") && ALLOWED_REDIRECTS.some((path) => redirect.startsWith(path))) {
    return redirect;
  }

  return "/";
}
