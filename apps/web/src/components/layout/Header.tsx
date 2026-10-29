'use client';

import {
  ChevronDown,
  Heart,
  LayoutGrid01,
  MarkerPin01,
  SearchMd,
  ShoppingCart01,
  User01,
} from '@untitledui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { CategoryMenu } from '@/components/layout/CategoryMenu';
import { LocationMenu } from '@/components/layout/LocationMenu';
import { MegaMenu } from '@/components/layout/MegaMenu';
import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { featuredCategories } from '@/shared/config/categories';
import { defaultLocationId, findLocation } from '@/shared/config/locations';
import { cn } from '@/shared/lib/cn';
import { localized } from '@/shared/lib/localized';

type HeaderPanel = 'categories' | 'location' | null;

export function Header() {
  const { t, i18n } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const [openPanel, setOpenPanel] = useState<HeaderPanel>(null);
  const [categorySlug, setCategorySlug] = useState<string | null>(null);
  const [locationId, setLocationId] = useState(defaultLocationId);

  const location = findLocation(locationId);
  const categoriesOpen = openPanel === 'categories';
  const locationOpen = openPanel === 'location';
  const menuOpen = openPanel !== null || categorySlug !== null;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'k' || event.altKey || !(event.metaKey || event.ctrlKey)) {
        return;
      }

      event.preventDefault();
      document.getElementById('header-search')?.focus();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const close = () => {
      setOpenPanel(null);
      setCategorySlug(null);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) {
        return;
      }
      close();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const togglePanel = (panel: Exclude<HeaderPanel, null>) => {
    setCategorySlug(null);
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  const toggleCategory = (slug: string) => {
    setOpenPanel(null);
    setCategorySlug((current) => (current === slug ? null : slug));
  };

  return (
    <header
      ref={rootRef}
      className="sticky top-0 z-40 border-b border-(--color-border) bg-(--color-surface)"
    >
      <Container className="flex h-20 items-center gap-4 lg:gap-7">
        <Link href="/" className="shrink-0">
          <Image
            src="/icons/Logo.svg"
            alt={t('brand.name')}
            width={146}
            height={31}
            className="h-7.75 w-auto"
            priority
            unoptimized
          />
        </Link>

        <Input
          id="header-search"
          variant="search"
          size="md"
          type="search"
          iconLeading={<SearchMd aria-hidden />}
          trailing={<SearchShortcut />}
          placeholder={t('nav.searchPlaceholder')}
          aria-label={t('nav.searchPlaceholder')}
          aria-keyshortcuts="Meta+K"
          className="hidden min-w-0 flex-1 md:flex"
        />

        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <HeaderAction icon={<Heart className="size-5" aria-hidden />} label={t('nav.favorites')} />
          <HeaderAction
            icon={<ShoppingCart01 className="size-5" aria-hidden />}
            label={t('nav.cart')}
          />
          <HeaderAction icon={<User01 className="size-5" aria-hidden />} label={t('nav.account')} />
        </div>
      </Container>

      <div className="relative border-t border-(--color-border)">
        <Container className="flex h-11 items-center gap-5">
          <button
            type="button"
            className={cn(
              'inline-flex shrink-0 items-center gap-2 text-sm font-medium transition-colors',
              categoriesOpen
                ? 'text-(--color-brand)'
                : 'text-(--color-ink) hover:text-(--color-brand)',
            )}
            aria-expanded={categoriesOpen}
            aria-controls="header-mega-menu"
            onClick={() => togglePanel('categories')}
          >
            <LayoutGrid01 className="size-5" aria-hidden />
            {t('nav.allCategories')}
          </button>

          <nav
            className="hidden min-w-0 flex-1 items-center gap-5 lg:flex"
            aria-label={t('nav.catalog')}
          >
            {featuredCategories().map((category) => {
              const open = categorySlug === category.slug;
              return (
                <div key={category.slug} className="relative shrink-0">
                  <button
                    type="button"
                    className={cn(
                      'text-sm transition-colors',
                      open
                        ? 'font-medium text-(--color-brand)'
                        : 'text-(--color-ink) hover:text-(--color-brand)',
                    )}
                    aria-expanded={open}
                    aria-controls={`header-category-${category.slug}`}
                    onClick={() => toggleCategory(category.slug)}
                  >
                    {localized(category.name, i18n.language)}
                  </button>
                  {open ? (
                    <CategoryMenu category={category} onNavigate={() => setCategorySlug(null)} />
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="relative ml-auto shrink-0">
            <button
              type="button"
              className={cn(
                'inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
                locationOpen
                  ? 'text-(--color-brand)'
                  : 'text-(--color-ink) hover:text-(--color-brand)',
              )}
              aria-expanded={locationOpen}
              aria-controls="header-location-menu"
              aria-label={t('nav.location')}
              onClick={() => togglePanel('location')}
            >
              <MarkerPin01 className="size-5" aria-hidden />
              {localized(location.city, i18n.language)}
              <ChevronDown className="size-4" aria-hidden />
            </button>
            {locationOpen ? (
              <LocationMenu
                selectedId={locationId}
                onSelect={(id) => {
                  setLocationId(id);
                  setOpenPanel(null);
                }}
              />
            ) : null}
          </div>
        </Container>

        {categoriesOpen ? (
          <div className="absolute inset-x-0 top-full z-50 border-b border-(--color-border) bg-(--color-surface) shadow-lg">
            <Container>
              <MegaMenu onNavigate={() => setOpenPanel(null)} />
            </Container>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function SearchShortcut() {
  return (
    <span
      aria-hidden
      className="header-search-shortcut pointer-events-none inline-flex items-center font-sans font-medium text-(--color-muted)"
    >
      <span className="inline-flex size-4 items-center justify-center text-[12px]/none">⌘</span>
      <span className="inline-flex size-4 items-center justify-center text-[14px]/none">K</span>
    </span>
  );
}

function HeaderAction({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button type="button" className="inline-flex w-14 flex-col items-center gap-1 text-(--color-ink)">
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
