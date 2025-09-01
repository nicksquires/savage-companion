import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;

    // If no token or user is not admin, redirect to home
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      // Run on protected routes to verify admin access
      authorized: ({ token }) => {
        // Only allow if token exists and role is admin
        return !!token && token.role === "ADMIN";
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"], // Match your admin routes
};

// // import { NextRequest, NextResponse } from "next/server";
// export { default } from 'next-auth/middleware'

// // export default middleware;

// // export function middleware(request: NextRequest) {
// //     return NextResponse.redirect(new URL('/new-page', request.url));
// // }

// export const config = {
//     // :path parameter can be modified with characters
//     // *: zero or more parameters
//     // +: one or more parameters
//     // ?: zero or one parameters
//     // matcher: ['/dashboard/:path*']
//     matcher: ['/dashboard/:path*']
// }