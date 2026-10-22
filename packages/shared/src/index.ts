import type { Money } from './money.js';

export type { Money } from './money.js';
export { formatMoney } from './money.js';

export type ProductId = string;

export type ProductSummary = {
  id: ProductId;
  title: string;
  price: Money;
  imageUrl?: string;
  location?: string;
  createdAt: string;
};

export type ProductDetails = ProductSummary & {
  description: string;
  sellerId: string;
};

export type HealthResponse = {
  status: 'ok';
  service: 'torba-api';
};
