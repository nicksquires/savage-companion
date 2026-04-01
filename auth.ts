import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/client";
import bcrypt from 'bcryptjs';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,    // consider tweaking later to allow auto-linking users

      // Explicit account selection
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        }
      },
      
      // Explicit 'user' creation on google 'account/ creation
      //    NOTE: if this fails, user is forced 
      //    in 'auth.config.ts' at signIn()
      profile(profile) {
        return {
          id: profile.sub, // CRITICAL: must return ID for the adapter to work
          name: profile.name || profile.email?.split("@")[0],
          email: profile.email,
          image: profile.picture,
          role: "FREE" as const,  // default role for new Google users
        };
      },
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user?.hashedPassword) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        );

        if (!passwordsMatch) return null;

        // Return the full user object
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image ?? null,
        };
      },
    }),
  ],
});