export type Money = {
  amount: number;
  currency: 'UAH';
};

/** Formats money for UI. `amount` is in major units (e.g. 199 = ₴199). */
export function formatMoney(money: Money, locale = 'uk-UA'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currency,
    maximumFractionDigits: 0,
  }).format(money.amount);
}
