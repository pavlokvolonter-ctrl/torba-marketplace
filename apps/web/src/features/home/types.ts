import type { Money, ProductSummary } from '@torba/shared';

import type { LocalizedText } from '@/shared/lib/localized';

export type HomeBanner = {
  id: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  href: string;
  imageUrl: string;
  /** wide = main carousel slide, side = smaller promo */
  variant: 'wide' | 'side';
  /** dark slides need light text; default dark text on light art */
  textTone?: 'dark' | 'light';
};

export type HomeCategory = {
  id: string;
  slug: string;
  name: LocalizedText;
  imageUrl: string;
};

export type HomeProduct = ProductSummary & {
  badge?: 'new';
  categoryName: LocalizedText;
  oldPrice?: Money;
  availability: LocalizedText;
  sellerName: string;
};

export type HomeFeed = {
  banners: HomeBanner[];
  popularCategories: HomeCategory[];
  trending: HomeProduct[];
};
