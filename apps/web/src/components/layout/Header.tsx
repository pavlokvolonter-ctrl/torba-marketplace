'use client';

import { Search, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { mainNav } from '@/shared/config/navigation';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center gap-4">
        <Link
          href="/"
          className="shrink-0 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-ink)]"
        >
          {t('brand.name')}
        </Link>

        <nav className="ml-2 hidden items-center gap-5 md:flex" aria-label="Main">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex flex-1 items-center justify-end gap-3 sm:max-w-md sm:flex-initial">
          <label className="relative hidden w-full max-w-xs sm:block">
            <span className="sr-only">{t('nav.searchPlaceholder')}</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[var(--color-muted)]"
              aria-hidden
            />
            <input
              type="search"
              readOnly
              placeholder={t('nav.searchPlaceholder')}
              className="h-10 w-full cursor-default rounded-md border border-[var(--color-border)] bg-[var(--color-surface-muted)] pr-3 pl-9 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted)]"
            />
          </label>

          <LanguageSwitcher />

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-ink)]"
            aria-label={t('nav.cart')}
          >
            <ShoppingBag className="size-5" aria-hidden />
          </button>
        </div>
      </Container>
    </header>
  );
}
