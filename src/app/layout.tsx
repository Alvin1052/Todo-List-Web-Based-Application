'use client';
import clsx from 'clsx';
import { Geist } from 'next/font/google';
import { Provider } from 'react-redux';
import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';

import store from './store';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={clsx(geistSans.variable, 'antialiased')}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
