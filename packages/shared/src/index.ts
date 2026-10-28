import type { ProductSummary } from './catalog.js';

export type { Money } from './money.js';
export { formatMoney } from './money.js';
export * from './catalog.js';

export type ProductDetails = ProductSummary & {
  description: string;
  sellerId: string;
};

export type HealthResponse = {
  status: 'ok';
  service: 'torba-api';
};
