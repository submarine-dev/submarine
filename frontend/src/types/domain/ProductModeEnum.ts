export const ProductModeEnum = {
  NONE_SELECTED: 'NONE_SELECTED',
  PRODUCTION: 'PRODUCTION',
  TRIAL: 'TRIAL',
} as const;

export type ProductModeEnum = (typeof ProductModeEnum)[keyof typeof ProductModeEnum];
