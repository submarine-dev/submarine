import useDiscloser from '@/hooks/common/useDiscloser';
import { useSubscription } from '@/hooks/useSubscription';
import { SubscriptionType } from '@/types/domain/SubscriptionType';
import { Alert, Snackbar } from '@mui/material';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddSubscriptionDrawer } from './drawer/AddSubscriptionDrawer';
import { SubscriptionsList } from './list/SubscriptionsList';
import { useUserData } from '@/hooks/useUserData';
import { CurrencyEnum } from '@/types/common/CurrencyEnum';
import { PaymentEnum } from '@/types/domain/PaymentEnum';

type Props = {
  subscriptionId: string | null;
  planId: string | null;
};

export const SubscriptionsContainer: FC<Props> = ({ subscriptionId, planId }) => {
  const router = useNavigate();
  const { subscriptionSummaries, targetSubscription, setSubscriptionId } = useSubscription();
  const { registerUserSubscription } = useUserData();

  const [isOpenControlDrawer, controlDrawerOpen, controlDrawerClose] = useDiscloser();
  const [isOpenSnackBar, onOpenSnackBar, onCloseSnackBar] = useDiscloser();

  /**
   * サブスクが選択された時にサブスクをセットしてdrawerを開く
   */
  const onSubscriptionClick = (subscriptionId: string) => {
    setSubscriptionId(subscriptionId);
    controlDrawerOpen();
  };

  /**
   * 登録のハンドリング
   *
   * @param targetSubscriptionParam
   * @param planId
   */
  const handleAddSubscription = async (
    targetSubscriptionParam: SubscriptionType,
    planId: string
  ): Promise<void> => {
    controlDrawerClose();
    if (!targetSubscriptionParam.plan) return;
    const targetPlan = targetSubscriptionParam.plan.find((plan) => plan.id === planId);
    if (!targetPlan) return;

    const subscriptionId = await registerUserSubscription({
      currency: CurrencyEnum.JPY,
      name: targetSubscriptionParam.name ?? '',
      planId: targetPlan.id ?? '',
      planName: targetPlan.name ?? '',
      planPaymentType: targetPlan.paymentType ?? PaymentEnum.monthly,
      planPrice: targetPlan.price ?? 0,
      subscriptionId: targetSubscriptionParam.id ?? '',
      /**
       * TODO: unsubscribeLinkどうすんだろこれ
       */
      unsubscribeLink: '',
    });

    if (!subscriptionId) {
      /**
       * TODO:登録失敗の処理
       */
      return;
    }

    onOpenSnackBar();
    setTimeout(() => {
      router(`/subscription/${subscriptionId}`);
    }, 3000);
  };

  /**
   * subscriptionIdがある場合には、fetchしてdrawerを開く
   */
  useEffect(() => {
    if (!subscriptionId) return;
    setSubscriptionId(subscriptionId);
    /**
     * ページ遷移後少し遅れて開く
     */
    setTimeout(() => {
      controlDrawerOpen();
    }, 300);
  }, [subscriptionId]);

  return (
    <>
      {subscriptionSummaries ? (
        <SubscriptionsList
          subscriptions={subscriptionSummaries}
          onSubscriptionClick={onSubscriptionClick}
        />
      ) : null}
      {targetSubscription ? (
        <AddSubscriptionDrawer
          open={isOpenControlDrawer}
          onClose={controlDrawerClose}
          subscription={targetSubscription}
          onAddSubscription={(planId: string) => handleAddSubscription(targetSubscription, planId)}
          paramPlanId={planId}
        />
      ) : null}
      <Snackbar open={isOpenSnackBar} onClose={onCloseSnackBar} autoHideDuration={3000}>
        <Alert onClose={onCloseSnackBar} severity="success" variant="filled" sx={{ width: '100%' }}>
          サブスクリプションを追加しました
        </Alert>
      </Snackbar>
    </>
  );
};
