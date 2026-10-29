import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/app/providers';
import { siteConfig } from '@/shared/config/site';

import './globals.css';

const bodyFont = Inter({
  variable: '--font-body',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/icons/Brandmark.svg',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang={siteConfig.defaultLocale} className={`${bodyFont.variable} h-full`}>
      <body className="min-h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
