import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from '@/components/navbar';
import Footer from '@/components/footer/footer';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Philosophy ',
    description: 'An interactive space to learn philosophy',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className="bg-white dark:bg-gray-950 scheme-light dark:scheme-dark"
        >
            <body className={`${inter.className} } antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NavBar />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
