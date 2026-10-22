'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
            {t('brand.name')}
          </p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            © {COPYRIGHT_YEAR} Torba. {t('footer.rights')}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[var(--color-muted)]">
          <Link href="/" className="hover:text-[var(--color-ink)]">
            {t('footer.about')}
          </Link>
          <Link href="/" className="hover:text-[var(--color-ink)]">
            {t('footer.support')}
          </Link>
          <span className="text-[var(--color-muted)]/70">{t('footer.sellers')}</span>
        </div>
      </Container>
    </footer>
  );
}
