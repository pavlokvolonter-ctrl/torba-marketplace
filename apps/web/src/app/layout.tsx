import type { Metadata } from 'next';
import { Manrope, Source_Serif_4 } from 'next/font/google';

import { Providers } from '@/app/providers';
import { siteConfig } from '@/shared/config/site';

import './globals.css';

const bodyFont = Manrope({
  variable: '--font-body',
  subsets: ['latin', 'cyrillic'],
});

const displayFont = Source_Serif_4({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang={siteConfig.defaultLocale}
      className={`${bodyFont.variable} ${displayFont.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
