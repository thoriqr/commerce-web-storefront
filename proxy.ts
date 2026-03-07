import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const hasAccessToken = request.cookies.has("access_token");
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/forgot-password" || pathname === "/reset-password";

  const isProtectedPage = pathname.startsWith("/orders") || pathname.startsWith("/wishlist");

  // logged in → block auth pages
  if (hasAccessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // not logged in → block protected pages
  if (!hasAccessToken && isProtectedPage) {
    const loginUrl = new URL("/login", request.url);

    // redirect back after login
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/forgot-password", "/reset-password", "/orders/:path*", "/wishlist/:path*"]
};
