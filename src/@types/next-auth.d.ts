import { IAuthenResponseModel } from '@core/models/authentication.model';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        // user: {
        //   // address: string;
        // } & DefaultSession['user'];
        user: IAuthenResponseModel;
    }

    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    // interface JWT {
    //   /** OpenID ID Token */
    //   idToken?: string;
    // }
}

declare module 'next-auth/jwt' {
    interface JWT extends IAuthenResponseModel {}
}

/*
// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            role: string,
        } & DefaultSession
    }

    interface User extends DefaultUser {
        role: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string,
    }
}
*/
