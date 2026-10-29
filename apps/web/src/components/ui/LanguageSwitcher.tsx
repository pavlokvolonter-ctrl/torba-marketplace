'use client';

import { Globe01 } from '@untitledui/icons';
import { useTranslation } from 'react-i18next';

import { isAppLocale } from '@/i18n/config';
import { siteConfig, type AppLocale } from '@/shared/config/site';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = (
    isAppLocale(i18n.language) ? i18n.language : siteConfig.defaultLocale
  ) as AppLocale;
  const next = current === 'uk' ? 'en' : 'uk';

  return (
    <button
      type="button"
      onClick={() => void i18n.changeLanguage(next)}
      className="inline-flex items-center gap-1 text-sm font-medium text-(--color-muted)"
      aria-label={t(`language.${current}`)}
    >
      <Globe01 className="size-5" aria-hidden />
      {t(`language.${current}`)}
    </button>
  );
}
