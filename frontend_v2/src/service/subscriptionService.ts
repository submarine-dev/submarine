import { apiClient } from '@/lib/apiClient';
import { trailMock } from '@/mock/traial';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { SubscriptionSummaryType, SubscriptionType } from '@/types/domain/SubscriptionType';

export const subscriptionService = {
  get: async (subscriptionId: string): Promise<SubscriptionType | null> => {
    if (!subscriptionId) return null;

    try {
      const res = await apiClient.subscription._subscriptionId(subscriptionId).$get();
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
        if (productMode === ProductModeEnum.TRIAL) return trailMock.subscriptions;
        await apiClient.subscription.$get();
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
