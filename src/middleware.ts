import { ENV } from '@core/constants/env.constants';
import { MY_ROUTE, rolePublic, roleUser } from '@core/constants/routes.constant';
import { UserRole } from '@core/models/user.model';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        if (!authorizeUser(request.nextUrl.pathname, request.nextauth.token?.user.role)) {
            return NextResponse.rewrite(new URL('/denied', request.url));
        }
    },
    {
        secret: ENV.AUTH_SECRET,
        callbacks: {
            authorized: ({ token, req }) => {
                return true;
            },
        },
        pages: {
            signIn: MY_ROUTE.LOGIN,
            error: '/auth/error',
        },
    },
);

function authorizeUser(pathname: string, authority?: UserRole) {
    if (rolePublic.includes(pathname)) {
        return true;
    } else if (authority === UserRole.STUDENT) {
        return roleUser.includes(pathname);
    } else if (authority === UserRole.TUTOR) {
        return roleUser.includes(pathname);
    } else {
        return true;
    }
}

export const config = { matcher: [`${MY_ROUTE.AI.self}/:path*`] };
