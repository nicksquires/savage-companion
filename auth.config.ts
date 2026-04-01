import type { NextAuthConfig } from "next-auth";
import type { Role } from "@prisma/client";

export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/signin", },

  callbacks: {
    async jwt({ token, user }) {
      // Only runs on sign-in (when user object exists)
      if (user) {
        token.role = user.role as Role ?? "FREE";
        token.name = user.name ?? user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as Role;
        session.user.name = token.name as string | undefined;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs (e.g. "/")
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      // Allows callback URLs on the same origin (prevents open redirects)
      try {
        const urlObj = new URL(url);
        if (urlObj.origin === baseUrl) {
          return url;
        }
      } catch {
        // Invalid URL - fall back safely
      }
      
      // Default fallback for everything else (including sign-out)
      return baseUrl + "/";
    },
  },
  providers: [], 
} satisfies NextAuthConfig;