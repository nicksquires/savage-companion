import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  // Route categories
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAuthPageRoute = nextUrl.pathname.startsWith("/signin");
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isCharactersRoute = nextUrl.pathname.startsWith("/characters");
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
  const isHomebrewRoute = nextUrl.pathname.startsWith("/homebrew");

  // Always allow API auth routes (login, callback, etc.)
  if (isApiAuthRoute) return NextResponse.next();

  // Redirect logged-in users AWAY from the auth page
  if (isAuthPageRoute) {
    if (isLoggedIn) {
      // Send them to the dashboard if they try to access login while authenticated
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  // Admin scoping
  if (isAdminRoute) {
    if (!isLoggedIn || role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  // Login scoping
  if ( isCharactersRoute 
    || isDashboardRoute 
    || isHomebrewRoute
  ) {
    if (!isLoggedIn) {
      // Pass the originally requested URL as a callback so they 
      // return wherever 'here' is after logging in
      const callbackUrl = encodeURIComponent(
        nextUrl.pathname + nextUrl.search
      );

      return NextResponse.redirect(new URL(
        `/signin?callbackUrl=${callbackUrl}`, nextUrl
      ));
    }
  }

  return NextResponse.next();
});

export const config = {
  // This matcher handles all routes except static files and icons
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};