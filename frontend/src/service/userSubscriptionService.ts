import { apiClient } from '@/lib/apiClient';
import { trailMock } from '@/mock/traial';
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
        if (productMode === ProductModeEnum.DEMO) return trailMock.userSubscriptions;
        return await apiClient.users._userId(userId).subscriptions.$get();
      })();
      return res;
    } catch (e) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(e);
      return null;
    }
  },
};
