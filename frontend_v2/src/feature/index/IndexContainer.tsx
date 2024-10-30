import { useUserData } from '@/hooks/useUserData';
import { Stack } from '@mui/material';
import type { FC } from 'react';
import { UserSubscriptionSummary } from './summary/UserSubscriptionSummary';
import { useNavigate } from 'react-router-dom';

export const IndexContainer: FC = () => {
  const router = useNavigate();
  const { userSubscription } = useUserData();

  const handleClickColumn = (subscriptionId: string): void => {
    router(`/subscription/${subscriptionId}`);
  };

  if (!userSubscription || !userSubscription.userSubscriptions) return null;
  return (
    <Stack direction="row">
      <UserSubscriptionSummary
        currentMonthPayment={userSubscription.totalAmountPerMonth ?? 0}
        userSubscriptions={userSubscription.userSubscriptions}
        onClickColumn={handleClickColumn}
      />
    </Stack>
  );
};
