import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/prisma/prisma";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      const customSession = {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };

      return Promise.resolve(customSession);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
