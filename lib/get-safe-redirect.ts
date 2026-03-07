export function getSafeRedirect(redirect: string | null) {
  if (!redirect) return "/";

  if (redirect.startsWith("/") && !redirect.startsWith("//")) {
    return redirect;
  }

  return "/";
}
