import { ENV } from '@core/constants/env.constants';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { Gender, UserType } from '@core/enums/user.enum';
import { LoginInput, SignUpInput } from '@core/models/authentication.model';
import { loginApi, signUpApi } from '@core/services/authentication.service';
import { isAxiosError } from 'axios';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
type CredentialProviderInput = { [key in keyof LoginInput]: any };
type CredentialSignUpProviderInput = { [key in keyof SignUpInput]: any };

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: MY_ROUTE.LOGIN,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: 'custom-login',
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
        CredentialsProvider({
            id: 'custom-signup',
            name: 'CredentialsSignUp',
            credentials: {
                email: { label: 'Email' },
                password: { label: 'Password' },
                gender: { label: 'gender' },
                fullName: { label: 'fullName' },
                type: { label: 'type' },
            } as CredentialSignUpProviderInput,
            async authorize(credentials) {
                // This is where you need to retrieve user data
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                if (!credentials) return;
                try {
                    const { data } = await signUpApi({
                        email: credentials.email,
                        password: credentials.password,
                        fullName: credentials.fullName,
                        gender: credentials.gender as unknown as Gender, // Fix: Cast credentials.gender to Gender type
                        type: credentials.type as unknown as UserType, // Fix: Cast credentials.type to UserType type
                        dateOfBirth: credentials.dateOfBirth as unknown as number, // Fix: Cast credentials.dateOfBirth to number type
                    });
                    return data.data as any;
                } catch (e: any) {
                    if (isAxiosError(e)) console.error('Sign up failed', e.message);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: ENV.GOOGLE_CLIENT_ID!,
            clientSecret: ENV.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        session: async ({ session, token }) => {
            const { user, account } = token;
            session.user = user as any;
            session.account = account;

            return session;
        },
        jwt: async ({ token, user, account, trigger, session }) => {
            if (user) {
                token.user = {
                    ...token.user,
                    ...user,
                };
            }
            if (trigger === 'signIn' && user) {
                if (account?.provider !== 'credentials') {
                    token.user = {
                        ...token.user,
                        ...user,
                    };
                    token.account = { ...account, ...token };
                    // return { account };
                }
            }
            if (trigger === 'update') {
                token = session;
            }
            return token;
        },
        // jwt: async ({ user, token, account, trigger, session }) => {
        //     console.log('account  dd', account);
        //     if (trigger === 'update') {
        //         return { ...user, ...session.user };
        //     }
        //     return {
        //         ...token,
        //         ...user,
        //     };
        // },
    },
};
