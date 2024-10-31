import { useUserData } from '@/hooks/useUserData';
import { Stack } from '@mui/material';
import type { FC } from 'react';
import { UserSubscriptionSummary } from './summary/UserSubscriptionSummary';
import { useNavigate } from 'react-router-dom';
import { SectionLayout } from '@/components/section/SectionLayout';
import { AddSubscription } from './add/AddSubscription';
import { useSubscription } from '@/hooks/useSubscription';
import { AutoRegister } from './autoRegister/AutRegister';

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
      <SectionLayout
        sectionTitle="自動で登録"
        helpText="メール情報から、AIによってサブスクリプションの登録をサジェストします"
      >
        <AutoRegister />
      </SectionLayout>
      {subscriptionSummaries ? (
        <SectionLayout sectionTitle="手動で登録">
          <AddSubscription
            subscriptionSummaries={subscriptionSummaries}
            onFindSubscriptionClick={handleFindSubscriptionClick}
            onSubscriptionClick={handleSubscriptionClick}
          />
        </SectionLayout>
      ) : null}
    </Stack>
  );
};
