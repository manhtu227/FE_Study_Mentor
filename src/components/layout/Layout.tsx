'use client';
import { PropsWithChildren } from 'react';

import QuestionIcon from '@components/message/QuestionIcon';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import Header from './Header';

export default function Layout({ children }: PropsWithChildren) {
    // how to get path url
    // const router = useRouter();
    // window.
    const pathname = usePathname();

    return (
        <>
            {pathname !== MY_ROUTE.LOGIN &&
                pathname !== MY_ROUTE.SIGN_UP &&
                pathname !== MY_ROUTE.RESET_PASSWORD && (
                    <>
                        <Header />
                        <QuestionIcon />
                    </>
                )}

            <div
                className={
                    pathname !== MY_ROUTE.LOGIN &&
                    pathname !== MY_ROUTE.SIGN_UP &&
                    pathname !== MY_ROUTE.RESET_PASSWORD
                        ? 'pt-[64px]'
                        : ''
                }
            >
                <ToastContainer />
                {children}
            </div>
            {/* <Footer /> */}
        </>
    );
}
