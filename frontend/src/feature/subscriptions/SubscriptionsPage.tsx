import { PrimaryLayout } from '@/components/layout/PrimaryLayout';
import type { FC } from 'react';
import { SubscriptionsContainer } from './SubscriptionsContainer.tsx';
import { getParamsFn } from '@/utils/getParamsFn.ts';

export const SubscriptionsPage: FC = () => {
  const [subscriptionId, planId] = getParamsFn(['subscriptionId', 'planId']);

  return (
    <PrimaryLayout>
      <SubscriptionsContainer subscriptionId={subscriptionId} planId={planId} />
    </PrimaryLayout>
  );
};
