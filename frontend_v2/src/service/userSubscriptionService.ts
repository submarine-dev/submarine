import { trailMock } from '@/mock/traial';
import { UserSubscriptionType } from '@/types/domain/UserSubscriptionType';

export const userSubscriptionService = {
  get: async (userId: string): Promise<UserSubscriptionType | null> => {
    if (!userId) return null;
    try {
      //   const res = await apiClient.users._userId(userId).subscriptions.$get();
      const res = trailMock.userSubscriptions;
      return res;
    } catch (e) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(e);
      return null;
    }
  },
};
