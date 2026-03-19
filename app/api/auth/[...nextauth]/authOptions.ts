import { prisma } from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt';
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email', placeholder: 'Email'},
          password: { label: 'Password', type: 'password', placeholder: 'Password'},
        },
        async authorize(credentials, _req) {
          if (!credentials?.email || !credentials?.password) return null;

          // Check email
          const user = await prisma.user.findUnique(
            { where: { email: credentials.email },
          });

          if (!user?.hashedPassword) return null;

          // Check password
          const passwordsMatch = await bcrypt.compare(
            credentials.password, 
            user.hashedPassword!
          );

          return passwordsMatch ? user : null;
        },
      }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            // Very often useful in production (forces account selection)
            // authorization: {
            //     params: {
            //       prompt: "select_account consent",
            //       access_type: "offline",
            //       response_type: "code"
            //     }
            //   }
        })
    ],

    session: {
      strategy: 'jwt' // good choice if you don't need DB sessions, but may move to 'database' strategy later
    },

    callbacks: {
      async jwt({ token, user }) {
        // Only runs on sign-in (when user object exists)
        if (user) {
          // Avoid extra DB query — user object already has most fields
          token.role = user.role ?? "n/a";
          // token.id   = user.id;        // if needed 
        }

        return token;
      },

      async session({ session, token }) {
        if (session.user) {
          session.user.role = token.role as string | undefined;
        // session.user.id = token.id as string;   // if needed
        }
      return session;
      },

      async redirect({ url, baseUrl }) {
        // Allow sign-in -> dashboard. Safe default- prevents open-redirect attacks
        if (url.startsWith(baseUrl)) return url;

        // Allow known safe external URLs (rare)
        //if (url.startsWith("https://trusted-partner.com/")) return url;

        // Default -> homepage (prevents open-redirect)
        return baseUrl + "/";
        },
      },
};