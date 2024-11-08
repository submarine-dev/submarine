export const CurrencyEnum = {
  USD: 'USD',
  JPY: 'JPY',
} as const;

export type CurrencyEnum = (typeof CurrencyEnum)[keyof typeof CurrencyEnum];
