import { PrimaryLayout } from '@/components/layout/PrimaryLayout';
import { getParamsFn } from '@/utils/getParamsFn.ts';
import type { FC } from 'react';
import { SubscriptionsContainer } from './SubscriptionsContainer.tsx';

export const SubscriptionsPage: FC = () => {
  const [subscriptionId, planId] = getParamsFn(['subscriptionId', 'planId']);

  return (
    <PrimaryLayout>
      <SubscriptionsContainer subscriptionId={subscriptionId} planId={planId} />
    </PrimaryLayout>
  );
};
