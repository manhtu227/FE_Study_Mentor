import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOptions } from '../../app/api/auth/[...nextauth]/options';

export async function getSessionToken() {
    try {
        const sessionSever = await getServerSession(authOptions);
        if (sessionSever?.user.accessToken) return sessionSever.user.accessToken;
    } catch (err) {
        const session = await getSession();
        if (session?.user?.accessToken) return session?.user.accessToken;
    }
}
