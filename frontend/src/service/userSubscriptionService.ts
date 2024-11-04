import { apiClient } from '@/lib/apiClient';
import { demoMock } from '@/mock/demoMock';
import { AutoManagementSuggestSubscriptionType } from '@/types/domain/AutoManagementSuggestSubscriptionType';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { UserSubscriptionType } from '@/types/domain/UserSubscriptionType';

export const userSubscriptionService = {
  get: async ({
    userId,
    productMode,
  }: {
    userId: string;
    productMode: ProductModeEnum;
  }): Promise<UserSubscriptionType | null> => {
    if (!userId) return null;
    try {
      const res = (async () => {
        if (productMode === ProductModeEnum.DEMO) return demoMock.userSubscriptions;
        return await apiClient.users._userId(userId).subscriptions.$get();
      })();
      return res;
    } catch (e) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(e);
      return null;
    }
  },

  getAutoManagementSuggests: async ({
    userId,
    productMode,
  }: {
    userId: string;
    productMode: ProductModeEnum;
  }): Promise<AutoManagementSuggestSubscriptionType[] | null> => {
    if (!userId) return null;
    try {
      const res = (async () => {
        if (productMode === ProductModeEnum.DEMO)
          return demoMock.autoManagementSuggestSubscriptions;
        /**
         * TODO: swagger変更次第、実装
         */
        // return await apiClient.users._userId(userId).subscriptions.autoRegisterSuggests.$get();
      })();
      if (!res) return null;
      // @ts-ignore
      return res;
    } catch (e) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(e);
      return [];
    }
  },
};
