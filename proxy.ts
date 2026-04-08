import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const hasRefreshToken = request.cookies.has("refresh_token");
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/forgot-password" || pathname === "/reset-password";

  const isProtectedPage = pathname.startsWith("/order") || pathname.startsWith("/user") || pathname.startsWith("/checkout");

  // logged in → block auth pages
  if (hasRefreshToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // not logged in → block protected pages
  if (!hasRefreshToken && isProtectedPage) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/forgot-password", "/reset-password", "/order/:path*", "/user/:path*", "/checkout/:path*"]
};
