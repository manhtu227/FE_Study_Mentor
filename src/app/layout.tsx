import Layout from '@components/layout/Layout';
import AntDesignProvider from '@core/provider/AntDesignProvider';
import ReactQueryProvider from '@core/provider/ReactQueryProvider';
import { Providers } from '@core/store/provider';
import '@styles/globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' suppressHydrationWarning={true}>
            <body>
                <ReactQueryProvider>
                    <AntDesignProvider>
                        <Providers>
                            <Layout>{children}</Layout>
                        </Providers>
                    </AntDesignProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
