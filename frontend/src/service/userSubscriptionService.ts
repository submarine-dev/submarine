import { apiClient } from '@/lib/apiClient';
import { demoMock } from '@/mock/demoMock';
import { AutoManagementSuggestSubscriptionType } from '@/types/domain/AutoManagementSuggestSubscriptionType';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { UserSubscriptionType } from '@/types/domain/UserSubscriptionType';
import { Controller_CreateUserSubscriptionRequest } from '../../api/@types';

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

  registerUserSubscription: async (
    params: Required<Controller_CreateUserSubscriptionRequest> & {
      userId: string;
      productMode: ProductModeEnum;
    }
  ): Promise<string | null> => {
    if (!params.userId) return null;
    try {
      const res = await (async () => {
        if (params.productMode === ProductModeEnum.DEMO) {
          if (demoMock.userSubscriptions.userSubscriptions)
            return demoMock.userSubscriptions.userSubscriptions[0].id;
          return null;
        }
        return await apiClient.users._userId(params.userId).subscriptions.$post({
          body: params,
        });
      })();
      if (typeof res === 'string') return res;
      if (!res || !res.userSubscrionId) return null;
      return res.userSubscrionId;
    } catch (e) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(e);
      return null;
    }
  },

  deleteUserSubscription: async ({
    userId,
    subscriptionId,
    productMode,
  }: {
    userId: string;
    subscriptionId: string;
    productMode: ProductModeEnum;
  }): Promise<boolean> => {
    if (!userId || !subscriptionId) return false;
    try {
      const res = await (async () => {
        if (productMode === ProductModeEnum.DEMO) return true;
        return await apiClient.users
          ._userId(userId)
          .subscriptions._userSubscriptionId(subscriptionId)
          .$delete();
      })();
      return !!res;
    } catch (e) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(e);
      return false;
    }
  },
};
