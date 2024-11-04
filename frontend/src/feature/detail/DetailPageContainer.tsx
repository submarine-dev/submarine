import { CardLayout } from '@/components/card/CardLayout';
import { useUserData } from '@/hooks/useUserData';
import { Stack } from '@mui/material';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { DetailHeader } from './header/DetailHeader';
import { CurrentDetailHistory } from './history/CurrentDetailHistory';
// import { DetailHistory } from './history/DetailHistory';
import { SectionLayout } from '@/components/section/SectionLayout';

export const DetailPageContainer: FC = () => {
  const { pathname } = useLocation();
  const { getUserSubscription } = useUserData();

  const subscriptionId = pathname.split('/').pop();
  if (!subscriptionId) return null;

  const subscription = getUserSubscription(subscriptionId);
  if (!subscription) return null;
  return (
    <Stack>
      <SectionLayout>
        <CardLayout>
          <DetailHeader
            icon={subscription.icon ?? ''}
            name={subscription.name ?? ''}
            // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
            onDeleteClick={() => {}}
            // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
            onEditClick={() => {}}
          />
          <CurrentDetailHistory
            history={{
              planName: subscription.planName ?? '',
              paymentType: subscription.paymentType ?? 'monthly',
              price: subscription.price ?? 0,
              paidAt: subscription.paidAt ?? '',
            }}
          />
        </CardLayout>
      </SectionLayout>
      {/* <SectionLayout>
        <CardLayout>
          <DetailHistory />
        </CardLayout>
      </SectionLayout> */}
    </Stack>
  );
};
