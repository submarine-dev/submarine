import { subscriptionService } from '@/service/subscriptionService';
import { useProductMode } from '@/store/useProductMode';
import { useQuery } from '@tanstack/react-query';

export const useSubscription = () => {
  const { productMode } = useProductMode();

  const {
    data: subscriptionSummaries,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => await subscriptionService.getAll({ productMode }),
  });

  return { subscriptionSummaries, isPending, isError };
};
