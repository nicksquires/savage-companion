import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// middleware.ts refactored for growth
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. Admin Scoping
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 2. Character Builder Scoping (Logged in, but any role)
    if (path.startsWith("/characters/builder") && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      // This ensures the middleware function above only runs if 'authorized' is true
      authorized: ({ token }) => !!token, 
    },
  }
);

export const config = {
  // Add all protected routes here
  matcher: ["/admin/:path*", "/characters/builder/:path*"],
};










// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   async function middleware(req) {
//     const { token } = req.nextauth;

//     // If no token or user is not admin, redirect to home
//     if (!token || token.role !== "ADMIN") {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//   },
//   {
//     callbacks: {
//       // Run on protected routes to verify admin access
//       authorized: ({ token }) => {
//         // Only allow if token exists and role is admin
//         return !!token && token.role === "ADMIN";
//       },
//     },
//   }
// );

// export const config = {
//   matcher: ["/admin/:path*"], // Match your admin routes
// };
















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