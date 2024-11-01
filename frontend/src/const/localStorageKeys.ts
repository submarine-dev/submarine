const PREFIX = 'SUBMARINE_';

export const localStorageKeys = {
  /**
   * AuthCodeを格納するkey
   */
  AUTH_CODE_KEY: `${PREFIX}AUTH_CODE_KEY`,

  /**
   * ProductModeを格納するkey
   */
  PRODUCT_MODE_KEY: `${PREFIX}PRODUCT_MODE_KEY`,
} as const;
