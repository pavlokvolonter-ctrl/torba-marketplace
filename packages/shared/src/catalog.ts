import type { Money } from './money.js';

export type ProductId = string;

export type Category = {
  id: string;
  slug: string;
  name: string;
  /** Icon key/URL for the UI (e.g. "sofa"). */
  icon: string | null;
  /** Subcategories; empty for leaf categories. */
  children: Category[];
};

export type PopularCategory = {
  id: string;
  slug: string;
  name: string;
  icon: string | null;
};

export type Banner = {
  id: string;
  title: string;
  text: string | null;
  imageUrl: string;
  /** Call-to-action button label. */
  ctaLabel: string | null;
  /** Link the banner/button leads to. */
  href: string | null;
  /** Slider order, ascending. */
  order: number;
  /** Featured campaign (e.g. Holiday, Black Friday) rather than a regular slide. */
  isFeatured: boolean;
};

export type Location = {
  id: string;
  name: string;
  /** Region (oblast) name; null for regions themselves. */
  region: string | null;
};

export type DeliveryType = 'NOVA_POSHTA' | 'UKRPOSHTA' | 'PICKUP' | 'COURIER';

export type ProductSummary = {
  id: ProductId;
  slug: string;
  title: string;
  image: string;
  price: Money;
  oldPrice: Money | null;
  category: { id: string; slug: string; name: string };
  /** Short label such as "Новинка". */
  badge: string | null;
  deliveryType: DeliveryType;
  city: string;
  isFavorite: boolean;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
};
