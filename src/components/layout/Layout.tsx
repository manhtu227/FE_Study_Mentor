'use client';
import { PropsWithChildren } from 'react';

import QuestionIcon from '@components/message/QuestionIcon';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { usePathname } from 'next/navigation';
import Header from './Header';

export default function Layout({ children }: PropsWithChildren) {
    // how to get path url
    // const router = useRouter();
    // window.
    const pathname = usePathname();

    return (
        <>
            {pathname !== MY_ROUTE.LOGIN && pathname !== MY_ROUTE.SIGN_UP && (
                <>
                    <Header />
                    <QuestionIcon />
                </>
            )}

            <div
                className={
                    pathname !== MY_ROUTE.LOGIN && pathname !== MY_ROUTE.SIGN_UP ? 'pt-[64px]' : ''
                }
            >
                {children}
            </div>
            {/* <Footer /> */}
        </>
    );
}
