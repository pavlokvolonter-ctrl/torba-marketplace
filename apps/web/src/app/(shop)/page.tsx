'use client';

import { useTranslation } from 'react-i18next';

import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <PagePlaceholder title={t('pages.home.title')} description={t('pages.home.description')} />
  );
}
