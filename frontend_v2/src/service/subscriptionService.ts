import { apiClient } from '@/lib/apiClient';
import { SubscriptionType } from '@/types/domain/SubscriptionType';

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
};
