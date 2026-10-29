'use client';

import { Check, SearchMd } from '@untitledui/icons';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from '@/components/ui/Input';
import { searchLocations } from '@/shared/config/locations';
import { cn } from '@/shared/lib/cn';
import { localized } from '@/shared/lib/localized';

type LocationMenuProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export function LocationMenu({ selectedId, onSelect }: LocationMenuProps) {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');

  const hasQuery = query.trim().length > 0;
  const results = useMemo(
    () => searchLocations(query, i18n.language),
    [i18n.language, query],
  );

  return (
    <div
      id="header-location-menu"
      className="absolute top-full right-0 z-50 mt-3 w-90 rounded-2xl border border-(--color-border) bg-(--color-surface) p-3 shadow-lg"
    >
      <Input
        size="sm"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('nav.locationSearch')}
        aria-label={t('nav.locationSearch')}
        iconLeading={<SearchMd aria-hidden />}
      />

      <button
        type="button"
        className="mt-2 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-primary-700 hover:bg-primary-50"
      >
        <Image
          src="/icons/locate-fixed.svg"
          alt=""
          width={18}
          height={18}
          className="size-[18px] shrink-0"
          unoptimized
          aria-hidden
        />
        {t('nav.currentLocation')}
      </button>

      {hasQuery ? null : (
        <p className="mt-3 px-2 text-sm text-(--color-muted)">{t('nav.popularCities')}</p>
      )}
      {results.length === 0 ? (
        <p className="mt-3 px-2 text-sm text-(--color-muted)">{t('nav.noCities')}</p>
      ) : (
        <ul className={cn('mt-1 max-h-80 overflow-y-auto', hasQuery && 'mt-3')}>
          {results.map((location) => {
            const selected = location.id === selectedId;
            return (
              <li key={location.id}>
                <button
                  type="button"
                  onClick={() => onSelect(location.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left',
                    selected ? 'bg-primary-100' : 'hover:bg-(--color-surface-muted)',
                  )}
                >
                  <span className="min-w-0 flex-1 truncate">
                    <span className="text-sm font-semibold text-(--color-ink)">
                      {localized(location.city, i18n.language)}
                    </span>
                    <span className="ml-2 text-sm text-(--color-muted)">
                      {localized(location.region, i18n.language)}
                    </span>
                  </span>
                  {selected ? (
                    <Check className="size-4 shrink-0 text-primary-700" aria-hidden />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
