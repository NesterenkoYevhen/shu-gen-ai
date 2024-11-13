import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { getUser } from '../endpoints/getUser';
import { getSubscription } from '../endpoints/getSubscription';
import { Subscription } from '../types/common';

interface CustomUser {
  id: string;
  accessToken: string;
}

export interface CustomSession extends Session {
  accessToken?: string;
  subscription?: Subscription | null;
}

interface CustomJWT extends JWT {
  accessToken?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        try {
          const res = await axios.post(`${process.env.API_URL}/auth/token/login/`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res.data.auth_token) {
            return { id: 'uniqueUserId', accessToken: res.data.auth_token };
          }
          return null;
        } catch (error) {
          console.error('Error during login:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token, user,
    }): Promise<CustomJWT> {
      if (user) {
        const customUser = user as CustomUser;
        token.accessToken = customUser.accessToken;
      }
      return token as CustomJWT;
    },
    async session({ session, token }): Promise<CustomSession> {
      const { accessToken } = token as CustomJWT;
      if (!accessToken) {
        throw new Error('Access token missing');
      }
      const user = await getUser(accessToken);
      const subscription = await getSubscription(accessToken);
      const customSession = session as CustomSession;
      customSession.accessToken = accessToken;
      customSession.user = user;
      customSession.subscription = subscription;
      return customSession;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
