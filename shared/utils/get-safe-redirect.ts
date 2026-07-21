// const ALLOWED_REDIRECTS = ["/cart"];

export function getSafeRedirect(redirect: string | null) {
  if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
    return redirect;
  }

  return "/";
}
