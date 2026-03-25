import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isCharacterBuilderRoute = nextUrl.pathname.startsWith("/characters/builder");
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

  // 1. Always allow API auth routes (login, callback, etc.)
  if (isApiAuthRoute) return NextResponse.next();

  // 2. Admin Scoping
  if (isAdminRoute) {
    if (!isLoggedIn || role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  // 3. Protected Routes (Logged in required)
  if (isCharacterBuilderRoute || isDashboardRoute) {
    if (!isLoggedIn) {
      // Redirect to your custom sign-in page defined in auth.config.ts
      return NextResponse.redirect(new URL("/auth/signin", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  // This matcher handles all routes except static files and icons
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};