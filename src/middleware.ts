import { ENV } from '@core/constants/env.constants';
import { MY_ROUTE, rolePublic, roleTutor, roleUser } from '@core/constants/routes.constant';
import { UserRole } from '@core/models/user.model';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        if (!authorizeUser(request.nextUrl.pathname, request.nextauth.token?.user?.user?.role)) {
            return NextResponse.rewrite(new URL('/denied', request.url));
        }
    },
    {
        secret: ENV.AUTH_SECRET,
        callbacks: {
            authorized: ({ token, req }) => {
                if (
                    req.nextUrl.pathname === '/' ||
                    req.nextUrl.pathname === MY_ROUTE.SIGN_UP ||
                    req.nextUrl.pathname === MY_ROUTE.RESET_PASSWORD
                ) {
                    return true;
                }
                console.log(token?.user?.user?.id, 'loi à');
                return !!token?.user?.user?.id;
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
        return (
            roleUser.includes(pathname) ||
            roleUser.includes(pathname.substring(0, pathname.lastIndexOf('/')))
        );
    } else if (authority === UserRole.TUTOR) {
        return (
            roleTutor.includes(pathname) ||
            roleTutor.includes(pathname.substring(0, pathname.lastIndexOf('/')))
        );
    } else {
        return true;
    }
}

// export const config = { matcher: [`${MY_ROUTE.AI.self}/:path*`] };
