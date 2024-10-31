export const ProductModeEnum = {
  NORMAL: 'NORMAL',
  TRIAL: 'TRIAL',
} as const;

export type ProductModeEnum = (typeof ProductModeEnum)[keyof typeof ProductModeEnum];
