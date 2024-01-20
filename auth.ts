import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import db from "./lib/db";
// import { compare, hash } from "bcrypt";

export const options: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = credentials.password === user.password;

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        console.log("user: " + user);
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // console.log("Jwt", { token, user });
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }

      return token;
    },
    session: ({ session, token, user }) => {
      // console.log("Session Callbacks", { session, token });
      // session.accessToken = token.accessToken;
      // session.user.id = token.id;
      // console.log("Hello");
      // console.log(session, user);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },

    async signIn({ user, credentials }) {
      if (user) {
        return true;
      } else {
        return false;
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  events: {
    async signIn({ user, isNewUser }) {
      console.log({ user }, "Signed in");
    },
  },
} satisfies AuthOptions;
