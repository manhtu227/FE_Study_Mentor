import { isAxiosError } from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';

import { MY_ROUTE } from '@core/constants/routes.constant';
import { LoginInput } from '@core/models/authentication.model';
import { loginApi } from '@core/services/authentication.service';
import type { NextAuthOptions } from 'next-auth';
type CredentialProviderInput = { [key in keyof LoginInput]: any };

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: MY_ROUTE.LOGIN,
    },
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email' },
                password: { label: 'Password' },
            } as CredentialProviderInput,
            async authorize(credentials) {
                // This is where you need to retrieve user data
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                if (!credentials) return;
                try {
                    const { data } = await loginApi({
                        email: credentials.email,
                        password: credentials.password,
                    });
                    return data.data as any;
                } catch (e: any) {
                    if (isAxiosError(e)) console.error('Login failed', e.message);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        session: async ({ session, token }) => {
            session.user = token as any;
            return session;
        },
        jwt: async ({ user, token }) => {
            return {
                ...token,
                ...user,
            };
        },
    },
};
