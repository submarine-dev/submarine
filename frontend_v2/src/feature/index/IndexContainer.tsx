import { useUserData } from '@/hooks/useUserData';
import { Stack } from '@mui/material';
import type { FC } from 'react';
import { UserSubscriptionSummary } from './summary/UserSubscriptionSummary';
import { useNavigate } from 'react-router-dom';
import { SectionLayout } from '@/components/section/SectionLayout';
import { AddSubscription } from './add/AddSubscription';
import { useSubscription } from '@/hooks/useSubscription';

export const IndexContainer: FC = () => {
  const router = useNavigate();
  const { userSubscription } = useUserData();
  const { subscriptionSummaries } = useSubscription();

  const handleClickColumn = (subscriptionId: string): void => {
    router(`/subscription/${subscriptionId}`);
  };

  const handleFindSubscriptionClick = (): void => {
    router('/subscriptions');
  };

  const handleSubscriptionClick = (subscriptionId: string): void => {
    router(`/subscriptions/${subscriptionId}`);
  };

  return (
    <Stack>
      {userSubscription?.userSubscriptions ? (
        <UserSubscriptionSummary
          currentMonthPayment={userSubscription.totalAmountPerMonth ?? 0}
          userSubscriptions={userSubscription.userSubscriptions}
          onClickColumn={handleClickColumn}
        />
      ) : null}
      {subscriptionSummaries ? (
        <SectionLayout sectionTitle="サブスクを追加">
          <AddSubscription
            subscriptionSummaries={subscriptionSummaries}
            onFindSubscriptionClick={handleFindSubscriptionClick}
            onSubscriptionClick={handleSubscriptionClick}
          />
        </SectionLayout>
      ) : null}
      aaa
    </Stack>
  );
};
