import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
// import localFont from 'next/font/local';
import { Recursive } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/custom/Navbar';
import Footer from '@/components/custom/Footer';
import { Toaster } from '@/components/ui/toaster';
import ClientProvider from '@/components/custom/ClientProvider';
import { constructMetadata } from '@/lib/utils';
import { AuthProvider } from '@/components/custom/AuthProvider';

const recursive = Recursive({ subsets: ['latin'] });
// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });

// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

export const metadata: Metadata = constructMetadata({});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            <html lang='en'>
                <body className={`${recursive.className} antialiased`}>
                    <Navbar />
                    <main className='grainy-light flex min-h-[calc(100vh-3.5rem)] flex-col'>
                        <div className='flex h-full flex-1 flex-col'>
                            <ClientProvider>{children}</ClientProvider>
                        </div>
                        <Footer />
                    </main>
                    <Toaster />
                    <SpeedInsights />
                </body>
            </html>
        </AuthProvider>
    );
}
