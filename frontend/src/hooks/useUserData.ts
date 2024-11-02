import { userSubscriptionService } from '@/service/userSubscriptionService';
import { useAuth } from '@/store/useAuth';
import { useQuery } from '@tanstack/react-query';
import { UserSubscriptionsType, UserSubscriptionType } from '@/types/domain/UserSubscriptionType';
import { useProductMode } from '@/store/useProductMode';

export const useUserData = (): {
  userSubscription: UserSubscriptionType | null | undefined;
  isPending: boolean;
  isError: boolean;
  getUserSubscription: (subscriptionId: string) => UserSubscriptionsType | null;
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

  const isPending = isPendingUserSubscription;
  const isError = isErrorUserSubscription;

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

  return {
    userSubscription,
    isPending,
    isError,
    getUserSubscription,
  };
};
