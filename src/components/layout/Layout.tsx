'use client';
import { PropsWithChildren } from 'react';

import QuestionIcon from '@components/message/QuestionIcon';
import Header from './Header';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
            <QuestionIcon />

            <div className='pt-[64px]'>{children}</div>
            {/* <Footer /> */}
        </>
    );
}
