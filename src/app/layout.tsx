import AntDesignProvider from '@core/provider/AntDesignProvider';
import ReactQueryProvider from '@core/provider/ReactQueryProvider';
import { Providers } from '@core/store/provider';
import '@styles/globals.scss';
import Layout from '../components/layout/Layout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
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
