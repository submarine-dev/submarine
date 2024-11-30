import { CardLayout } from '@/components/card/CardLayout';
import { useUserData } from '@/hooks/useUserData';
import { Alert, Snackbar, Stack } from '@mui/material';
import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DetailHeader } from './header/DetailHeader';
import { CurrentDetailHistory } from './history/CurrentDetailHistory';
// import { DetailHistory } from './history/DetailHistory';
import { SectionLayout } from '@/components/section/SectionLayout';
import { EditSubscriptionDrawer } from './drawer/EditSubscriptionDrawer';
import useDiscloser from '@/hooks/common/useDiscloser';
import { useSubscription } from '@/hooks/useSubscription';
import { CancelSubscriptionDrawer } from './drawer/CancelSubscriptionDrawer';

export const DetailPageContainer: FC = () => {
  const { pathname } = useLocation();
  const router = useNavigate();

  const { getUserSubscription, deleteUserSubscription, updateUserSubscription } = useUserData();
  const { targetSubscription, setSubscriptionId } = useSubscription();

  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  /**
   * edit
   */
  const [isOpenEditSubscription, onOpenEditSubscription, onCloseEditSubscription] = useDiscloser();
  const [isOpenSnackBar, onOpenSnackBar, onCloseSnackBar] = useDiscloser();

  /**
   * cancel
   */
  const [isOpenCancelSubscription, onOpenCancelSubscription, onCloseCancelSubscription] =
    useDiscloser();
  const [isOpenCancelSnackBar, onOpenCancelSnackBar, onCloseCancelSnackBar] = useDiscloser();

  const [isOpenErrorSnackBar, onOpenErrorSnackBar, onCloseErrorSnackBar] = useDiscloser();

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
  const handleUpdateSubscription = async (): Promise<void> => {
    onCloseEditSubscription();

    const isSuccess = await updateUserSubscription({
      subscriptionId,
      planId: selectedPlanId ?? '',
    });

    if (!isSuccess) {
      onOpenErrorSnackBar();
      return;
    }

    onOpenSnackBar();
    setTimeout(() => {
      router('/');
    }, 3000);
  };

  /**
   * サブスク解約のハンドリング
   */
  const handleCancelSubscription = async (): Promise<void> => {
    onCloseCancelSubscription();
    const isSuccess = await deleteUserSubscription(subscriptionId);

    if (!isSuccess) {
      onOpenErrorSnackBar();
      return;
    }

    onOpenCancelSnackBar();
    setTimeout(() => {
      router('/');
    }, 3000);
  };

  return (
    <>
      <Stack>
        <SectionLayout>
          <CardLayout>
            <DetailHeader
              icon={subscription.icon ?? ''}
              name={subscription.name ?? ''}
              onEditClick={handleEditStart}
              onDeleteClick={onOpenCancelSubscription}
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
      <CancelSubscriptionDrawer
        open={isOpenCancelSubscription}
        subscription={{
          icon: subscription.icon ?? '',
          name: subscription.name ?? '',
          unsubscribeLink: subscription.unsubscribeLink ?? '',
        }}
        isOpenSnackBar={isOpenCancelSnackBar}
        onClose={onCloseCancelSubscription}
        onCancelSubmit={handleCancelSubscription}
        onCloseSnackBar={onCloseCancelSnackBar}
      />
      <Snackbar open={isOpenErrorSnackBar} onClose={onCloseErrorSnackBar} autoHideDuration={3000}>
        <Alert
          onClose={onCloseErrorSnackBar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          エラーが発生しました。
        </Alert>
      </Snackbar>
    </>
  );
};
