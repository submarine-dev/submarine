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

  // /**
  //  * DEMOモードのチュートリアルが終了したかを格納するkey
  //  */
  // IS_DEMO_TUTORIAL_COMPLETED_KEY: `${PREFIX}IS_DEMO_TUTORIAL_COMPLETED_KEY`,
} as const;

export const sessionStorageKeys = {
  /**
   * DEMOモードのチュートリアルが終了したかを格納するkey
   */
  IS_DEMO_TUTORIAL_COMPLETED_KEY: `${PREFIX}IS_DEMO_TUTORIAL_COMPLETED_KEY`,
} as const;
