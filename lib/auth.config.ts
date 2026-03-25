import type { NextAuthConfig } from "next-auth";
import type { Role } from "@prisma/client";

export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Only runs on sign-in (when user object exists)
      if (user) {
        token.role = user.role as Role ?? "FREE";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as Role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allow sign-in -> dashboard. Safe default- prevents open-redirect attacks
      if (url.startsWith(baseUrl)) return url;
      // Default -> homepage
      return baseUrl + "/";
    },
  },
  // We leave this empty here and populate it in auth.ts
  providers: [], 
} satisfies NextAuthConfig;