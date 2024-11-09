import { userSubscriptionService } from '@/service/userSubscriptionService';
import { useAuth } from '@/store/useAuth';
import { useProductMode } from '@/store/useProductMode';
import { AutoManagementSuggestSubscriptionType } from '@/types/domain/AutoManagementSuggestSubscriptionType';
import { UserSubscriptionType, UserSubscriptionsType } from '@/types/domain/UserSubscriptionType';
import { useQuery } from '@tanstack/react-query';
import { Controller_CreateUserSubscriptionRequest } from '../../api/@types';

export const useUserData = (): {
  userSubscription: UserSubscriptionType | null | undefined;
  autoManagementSuggestSubscriptions: AutoManagementSuggestSubscriptionType[] | null | undefined;
  isPending: boolean;
  isError: boolean;
  getUserSubscription: (subscriptionId: string) => UserSubscriptionsType | null;
  registerUserSubscription: (
    params: Required<Controller_CreateUserSubscriptionRequest>
  ) => Promise<string | null>;
  deleteUserSubscription: (subscriptionId: string) => Promise<boolean>;
  updateUserSubscription: (params: {
    subscriptionId: string;
    planId: string;
  }) => Promise<boolean>;
} => {
  const { user } = useAuth();
  const { productMode, forAuthGetProductMode } = useProductMode();

  const {
    data: userSubscription,
    isPending: isPendingUserSubscription,
    isError: isErrorUserSubscription,
  } = useQuery({
    queryKey: ['userSubscription', user.userId, productMode],
    queryFn: async () => {
      if (!user.userId) return null;
      const data = await userSubscriptionService.get({
        userId: user.userId,
        productMode: forAuthGetProductMode(),
      });
      if (!data) return null;
      return data;
    },
  });

  const {
    data: autoManagementSuggestSubscriptions,
    isPending: isPendingAutoManagementSuggests,
    isError: isErrorAutoManagementSuggests,
  } = useQuery({
    queryKey: ['autoManagementSuggests', user.userId, productMode],
    queryFn: async () => {
      if (!user.userId) return null;
      const data = await userSubscriptionService.getAutoManagementSuggests({
        userId: user.userId,
        productMode: forAuthGetProductMode(),
      });
      if (!data) return [];
      return data;
    },
  });

  const isPending = isPendingUserSubscription || isPendingAutoManagementSuggests;
  const isError = isErrorUserSubscription || isErrorAutoManagementSuggests;

  /**
   * userSubscriptionの中から特定のsubscriptionを取得する
   *
   * @param subscriptionId
   * @returns subscription
   */
  const getUserSubscription = (subscriptionId: string): UserSubscriptionsType | null => {
    if (!userSubscription || !userSubscription.userSubscriptions) return null;
    const targetSubscription = userSubscription.userSubscriptions.find(
      (subscription) => subscription.id === subscriptionId
    );
    if (!targetSubscription) return null;
    return targetSubscription;
  };

  /**
   * 新しいサブスクリプションをユーザに登録する
   *
   * @param userSubscription
   * @returns subscriptionId
   */
  const registerUserSubscription = async (
    params: Required<Controller_CreateUserSubscriptionRequest>
  ): Promise<string | null> => {
    if (!user.userId) return null;
    const res = await userSubscriptionService.registerUserSubscription({
      ...params,
      userId: user.userId,
      productMode,
    });
    if (!res) return null;
    return res;
  };

  /**
   * サブスクを削除する
   *
   * @param subscriptionId
   * @returns isSuccessful
   */
  const deleteUserSubscription = async (subscriptionId: string): Promise<boolean> => {
    if (!user.userId) return false;
    const res = await userSubscriptionService.deleteUserSubscription({
      userId: user.userId,
      subscriptionId,
      productMode,
    });
    if (!res) return false;
    return true;
  };

  /**
   * サブスクを更新する
   *
   * @param subscriptionId
   * @param params
   *
   * @returns isSuccessful
   */
  const updateUserSubscription = async ({
    subscriptionId,
    planId,
  }: {
    subscriptionId: string;
    planId: string;
  }): Promise<boolean> => {
    if (!user.userId) return false;
    const res = await userSubscriptionService.updateSubscription({
      userId: user.userId,
      subscriptionId,
      planId,
      productMode,
    });
    if (!res) return false;
    return true;
  };

  return {
    userSubscription,
    autoManagementSuggestSubscriptions,
    isPending,
    isError,
    getUserSubscription,
    registerUserSubscription,
    deleteUserSubscription,
    updateUserSubscription,
  };
};
