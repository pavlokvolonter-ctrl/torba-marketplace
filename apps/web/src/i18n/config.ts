import type { AppLocale } from '@/shared/config/site';
import { siteConfig } from '@/shared/config/site';

export const defaultNS = 'common';
export const fallbackLng: AppLocale = siteConfig.defaultLocale;

export function isAppLocale(value: string): value is AppLocale {
  return (siteConfig.locales as readonly string[]).includes(value);
}
