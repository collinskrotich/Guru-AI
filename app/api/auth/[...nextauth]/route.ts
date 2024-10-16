import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { AuthOptions } from 'next-auth';
import { compare } from 'bcrypt';
import { sql } from "@vercel/postgres";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        const response = await sql`
          SELECT * FROM users
          WHERE email = ${credentials.email}
        `;
        const user = response.rows[0];

        if (!user) {
          throw new Error('User not found');
        }

        const passwordCorrect = await compare(credentials.password, user.password);
        console.log({passwordCorrect});

        if (!passwordCorrect) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
        };
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
