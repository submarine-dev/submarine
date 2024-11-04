import { subscriptionService } from '@/service/subscriptionService';
import { useProductMode } from '@/store/useProductMode';
import { SubscriptionSummaryType, SubscriptionType } from '@/types/domain/SubscriptionType';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useSubscription = (): {
  subscriptionSummaries: SubscriptionSummaryType[] | null | undefined;
  targetSubscription: SubscriptionType | null | undefined;
  setSubscriptionId: (subscriptionId: string) => void;
  isPending: boolean;
  isError: boolean;
} => {
  const { productMode, forAuthGetProductMode } = useProductMode();
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

  const {
    data: subscriptionSummaries,
    isPending: isPendingSubscriptionSummaries,
    isError: isErrorSubscriptionSummaries,
  } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => await subscriptionService.getAll({ productMode: forAuthGetProductMode() }),
  });

  const {
    data: targetSubscription,
    isPending: isPendingSubscription,
    isError: isErrorSubscription,
  } = useQuery({
    queryKey: ['subscription', subscriptionId],
    queryFn: async () => {
      if (!subscriptionId) return null;
      return await subscriptionService.get({ productMode, subscriptionId });
    },
  });

  const isPending = isPendingSubscriptionSummaries || isPendingSubscription;
  const isError = isErrorSubscription || isErrorSubscriptionSummaries;

  return { subscriptionSummaries, targetSubscription, setSubscriptionId, isPending, isError };
};
