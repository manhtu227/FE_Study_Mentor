import { RightOutlined } from '@ant-design/icons';
import NextBreadcrumb from '@components/bread-crumb/BreadCrumb';
import Layout from '@components/layout/Layout';
import AntDesignProvider from '@core/provider/AntDesignProvider';
import NextAuthProvider from '@core/provider/NextAuthProvider';
import ReactQueryProvider from '@core/provider/ReactQueryProvider';
import { Providers } from '@core/store/provider';
import '@styles/globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' suppressHydrationWarning={true}>
            <body>
                <ReactQueryProvider>
                    <NextAuthProvider>
                        <AntDesignProvider>
                            <Providers>
                                <Layout>
                                    <NextBreadcrumb
                                        homeElement={'Home'}
                                        separator={
                                            <span>
                                                {' '}
                                                <RightOutlined />{' '}
                                            </span>
                                        }
                                        activeClasses=''
                                        containerClasses='flex bg-transparent list-none'
                                        listClasses='hover:underline mx-2 font-bold'
                                        capitalizeLinks
                                    />
                                    {children}
                                </Layout>
                            </Providers>
                        </AntDesignProvider>
                    </NextAuthProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
