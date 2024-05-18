import { PropsWithChildren } from 'react';

import Header from './Header';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
            <div className='pt-[64px]'>{children}</div>
            {/* <Footer /> */}
        </>
    );
}
