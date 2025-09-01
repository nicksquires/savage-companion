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
        async authorize(credentials, req) {
          if (!credentials?.email || !credentials?.password) return null;

          // Check email
          const user = await prisma.user.findUnique({ where: { email: credentials.email }});

          if (!user) return null;

          // Check password
          const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword!);

          return passwordsMatch ? user : null;
        },
      }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            // authorization: {
            //     params: {
            //       prompt: "consent",
            //       access_type: "offline",
            //       response_type: "code"
            //     }
            //   }
        })
    ],
    session: {
      strategy: 'jwt'
    },
    callbacks: {
      // First login — attach role from user object
      // Runs when user logs in or token is refreshed
      async jwt({ token, user }) {

      if (user) {

      // Attach role from DB to the token
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email ?? undefined},
        });

        token.role = dbUser?.role ?? "n/a";
      }

      return token;
    },
      async session({ session, token }) {
        if (session.user) {
          session.user.role = token.role;
        }
      return session;
    },
      async redirect({url, baseUrl}) {
        return baseUrl + '/';
      }
    }
};