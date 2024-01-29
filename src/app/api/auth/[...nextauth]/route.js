import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // console.log({ credentials });
        mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne({ email: credentials?.username });
        const passwordOK = bcrypt.compareSync(
          credentials?.password,
          user?.password
        );
        if (user && passwordOK) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.name && session?.image) {
        token.image = session.image
        token.name = session.name
      }
      return { ...token, ...session };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
