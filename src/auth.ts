import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { User } from "next-auth";

export const { auth, handlers, signIn, signOut }: any = NextAuth({
  providers: [
    Credentials({
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize({ password }): Promise<User> {
        if (password !== process.env.ADMIN_PASSWORD) {
          throw new Error("Invalid password");
        }
        return { id: "1", name: "Admin" };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl + "/admin";
    },
  },
});
