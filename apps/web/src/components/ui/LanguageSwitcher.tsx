'use client';

import { useTranslation } from 'react-i18next';

import { isAppLocale } from '@/i18n/config';
import { siteConfig, type AppLocale } from '@/shared/config/site';
import { cn } from '@/shared/lib/cn';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = (
    isAppLocale(i18n.language) ? i18n.language : siteConfig.defaultLocale
  ) as AppLocale;

  return (
    <div className="flex items-center gap-1 rounded-md border border-[var(--color-border)] p-0.5">
      {siteConfig.locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => void i18n.changeLanguage(locale)}
          className={cn(
            'rounded px-2 py-1 text-xs font-medium transition-colors',
            current === locale
              ? 'bg-[var(--color-ink)] text-[var(--color-surface)]'
              : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]',
          )}
          aria-pressed={current === locale}
        >
          {t(`language.${locale}`)}
        </button>
      ))}
    </div>
  );
}
