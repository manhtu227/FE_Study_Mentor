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
        <div className='h-screen overflow-auto flex flex-col'>
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
                        ? 'flex-1 bg-[#F3F9FA]'
                        : ''
                }
            >
                <ToastContainer />
                {children}
            </div>
            {/* <Footer /> */}
        </div>
    );
}
