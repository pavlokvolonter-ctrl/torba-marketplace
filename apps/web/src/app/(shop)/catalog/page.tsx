'use client';

import { useTranslation } from 'react-i18next';

import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default function CatalogPage() {
  const { t } = useTranslation();

  return (
    <PagePlaceholder
      title={t('pages.catalog.title')}
      description={t('pages.catalog.description')}
    />
  );
}
