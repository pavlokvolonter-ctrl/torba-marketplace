'use client';

import { ChevronDown, Globe01, Mail01 } from '@untitledui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { isAppLocale } from '@/i18n/config';
import { siteConfig, type AppLocale } from '@/shared/config/site';
import { cn } from '@/shared/lib/cn';

const COPYRIGHT_YEAR = 2026;

const languageName: Record<AppLocale, string> = {
  uk: 'Українська',
  en: 'English',
};

const columns = [
  {
    title: 'footer.forYou',
    links: [
      { label: 'footer.categories', href: '/catalog' },
      { label: 'footer.new' },
      { label: 'footer.trends' },
      { label: 'footer.recommended' },
    ],
  },
  {
    title: 'footer.useful',
    links: [
      { label: 'footer.about' },
      { label: 'footer.payments' },
      { label: 'footer.warranty' },
    ],
  },
  {
    title: 'footer.help',
    links: [
      { label: 'footer.faq' },
      { label: 'footer.delivery' },
      { label: 'footer.contacts' },
    ],
  },
] as const;

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto border-t border-(--color-border) bg-(--color-canvas)">
      <div className="mx-auto flex w-full max-w-360 flex-col gap-10 px-4 pt-12 pb-6 sm:px-8 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(14rem,17rem)_repeat(3,minmax(0,1fr))] lg:gap-16">
          <div>
            <Link href="/" className="inline-flex">
              <Image
                src="/icons/Logo.svg"
                alt={t('brand.name')}
                width={146}
                height={31}
                className="h-7.75 w-auto"
                unoptimized
              />
            </Link>
            <p className="mt-4 max-w-68 text-sm leading-5 text-(--color-muted)">{t('footer.tagline')}</p>
            <div className="mt-6 flex items-center gap-4 text-(--color-ink)">
              <SocialLink label={t('footer.instagram')}>
                <InstagramIcon />
              </SocialLink>
              <SocialLink label={t('footer.facebook')}>
                <Image
                  src="/icons/FacebookIcon.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="size-[18px]"
                  unoptimized
                  aria-hidden
                />
              </SocialLink>
              <SocialLink label={t('footer.email')}>
                <Mail01 className="size-[18px]" aria-hidden />
              </SocialLink>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold text-(--color-ink)">{t(column.title)}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((item) => (
                  <li key={item.label}>
                    {'href' in item ? (
                      <Link
                        href={item.href}
                        className="text-sm text-(--color-muted) transition-colors hover:text-(--color-ink)"
                      >
                        {t(item.label)}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="text-left text-sm text-(--color-muted) transition-colors hover:text-(--color-ink)"
                      >
                        {t(item.label)}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {column.title === 'footer.help' ? <FooterLanguage /> : null}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-(--color-border) pt-6 text-sm text-(--color-muted) sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {COPYRIGHT_YEAR} torba. {t('footer.rights')}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <button type="button" className="transition-colors hover:text-(--color-ink)">
              {t('footer.privacy')}
            </button>
            <button type="button" className="transition-colors hover:text-(--color-ink)">
              {t('footer.terms')}
            </button>
            <span>{t('footer.region')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLanguage() {
  const { i18n } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const current: AppLocale = isAppLocale(i18n.language) ? i18n.language : siteConfig.defaultLocale;

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative mt-4">
      <button
        type="button"
        className="inline-flex items-center gap-2 text-sm text-(--color-ink)"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
      >
        <Globe01 className="size-4" aria-hidden />
        {languageName[current]}
        <ChevronDown className={cn('size-4 text-(--color-muted)', open && 'rotate-180')} aria-hidden />
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={languageName[current]}
          className="absolute bottom-full left-0 z-10 mb-2 min-w-40 rounded-lg border border-(--color-border) bg-white p-1 shadow-lg"
        >
          {siteConfig.locales.map((locale) => (
            <li key={locale}>
              <button
                type="button"
                role="option"
                aria-selected={locale === current}
                className={cn(
                  'flex w-full rounded-md px-3 py-2 text-left text-sm',
                  locale === current ? 'bg-primary-100 text-primary-700' : 'hover:bg-dark-100',
                )}
                onClick={() => {
                  void i18n.changeLanguage(locale);
                  setOpen(false);
                }}
              >
                {languageName[locale]}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function SocialLink({ label, children }: { label: string; children: ReactNode }) {
  return (
    <button type="button" aria-label={label} className="transition-colors hover:text-(--color-brand)">
      {children}
    </button>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
