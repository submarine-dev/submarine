import { PrimaryLayout } from '@/components/layout/PrimaryLayout';
import type { FC } from 'react';
import { SubscriptionsContainer } from './SubscriptionsContainer.tsx';
import { useLocation } from 'react-router-dom';

export const SubscriptionsPage: FC = () => {
  const location = useLocation();
  const subscriptionId = location.pathname.split('/').pop() ?? null;

  return (
    <PrimaryLayout>
      <SubscriptionsContainer subscriptionId={subscriptionId} />
    </PrimaryLayout>
  );
};
