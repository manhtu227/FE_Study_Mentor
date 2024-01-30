import { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
    return <div className='py-[64px] px-[180px]'>{children}</div>;
}

export default Layout;
