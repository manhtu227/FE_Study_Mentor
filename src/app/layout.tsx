import AntDesignProvider from '@core/provider/AntDesignProvider';
import '@styles/globals.scss';
import Layout from '../components/layout/Layout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body>
                <AntDesignProvider>
                    <Layout>{children}</Layout>
                </AntDesignProvider>
            </body>
        </html>
    );
}
