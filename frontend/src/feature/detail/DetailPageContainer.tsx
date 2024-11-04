import { CardLayout } from '@/components/card/CardLayout';
import { useUserData } from '@/hooks/useUserData';
import { Stack } from '@mui/material';
import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DetailHeader } from './header/DetailHeader';
import { CurrentDetailHistory } from './history/CurrentDetailHistory';
// import { DetailHistory } from './history/DetailHistory';
import { SectionLayout } from '@/components/section/SectionLayout';
import { EditSubscriptionDrawer } from './drawer/EditSubscriptionDrawer';
import useDiscloser from '@/hooks/common/useDiscloser';
import { useSubscription } from '@/hooks/useSubscription';

export const DetailPageContainer: FC = () => {
  const { pathname } = useLocation();
  const router = useNavigate();

  const { getUserSubscription } = useUserData();
  const { targetSubscription, setSubscriptionId } = useSubscription();

  const [isOpenEditSubscription, onOpenEditSubscription, onCloseEditSubscription] = useDiscloser();
  const [isOpenSnackBar, onOpenSnackBar, onCloseSnackBar] = useDiscloser();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const subscriptionId = pathname.split('/').pop();
  if (!subscriptionId) return null;

  const subscription = getUserSubscription(subscriptionId);
  if (!subscription) return null;

  /**
   * ユーザのサブスクの編集ボタンのクリックハンドラ
   */
  const handleEditStart = (): void => {
    setSubscriptionId(subscriptionId);
    onOpenEditSubscription();
  };

  /**
   * プランが選択された時のハンドラ
   */
  const handlePlanClick = (planId: string): void => {
    setSelectedPlanId(planId);
  };

  /**
   * プランの更新のハンドリング
   */
  const handleUpdateSubscription = (): Promise<void> => {
    /**
     * TODO: CRUD生え次第変更
     */
    onCloseEditSubscription();
    onOpenSnackBar();
    setTimeout(() => {
      router('/');
    }, 3000);
    return new Promise((resolve) => resolve());
  };

  return (
    <>
      <Stack>
        <SectionLayout>
          <CardLayout>
            <DetailHeader
              icon={subscription.icon ?? ''}
              name={subscription.name ?? ''}
              // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
              onEditClick={handleEditStart}
              // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
              onDeleteClick={() => {}}
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
      <EditSubscriptionDrawer
        open={isOpenEditSubscription}
        subscription={{
          icon: subscription.icon ?? '',
          name: subscription.name ?? '',
        }}
        plans={targetSubscription?.plan}
        selectedPlanId={selectedPlanId}
        isOpenSnackBar={isOpenSnackBar}
        onClickPlan={handlePlanClick}
        onCancel={onCloseEditSubscription}
        onSubmit={handleUpdateSubscription}
        onCloseSnackBar={onCloseSnackBar}
      />
    </>
  );
};
