import { apiClient } from '@/lib/apiClient';
import { demoMock } from '@/mock/demoMock';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { SubscriptionSummaryType, SubscriptionType } from '@/types/domain/SubscriptionType';

export const subscriptionService = {
  get: async ({
    productMode,
    subscriptionId,
  }: {
    productMode: ProductModeEnum;
    subscriptionId: string;
  }): Promise<SubscriptionType | null> => {
    if (!subscriptionId) return null;
    try {
      const res = (async () => {
        if (productMode === ProductModeEnum.DEMO)
          return demoMock.subscriptionsDetails.find(
            (subscription) => subscription.id === subscriptionId
          );
        return await apiClient.v1.subscription._subscriptionId(subscriptionId).$get();
      })();
      if (!res) return null;
      // @ts-ignore
      return res;
    } catch (e) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(e);
      return null;
    }
  },

  getAll: async ({
    productMode,
  }: {
    productMode: ProductModeEnum;
  }): Promise<SubscriptionSummaryType[] | null> => {
    try {
      const res = (async () => {
        if (productMode === ProductModeEnum.DEMO) return demoMock.subscriptions;
        await apiClient.v1.subscription.$get();
      })();
      if (!res) return null;
      // @ts-ignore
      return res;
    } catch (e) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(e);
      return null;
    }
  },
};
