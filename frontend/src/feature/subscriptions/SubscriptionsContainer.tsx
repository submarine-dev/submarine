import useDiscloser from '@/hooks/common/useDiscloser';
import { useSubscription } from '@/hooks/useSubscription';
import { SubscriptionType } from '@/types/domain/SubscriptionType';
import { Alert, Snackbar } from '@mui/material';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddSubscriptionDrawer } from './drawer/AddSubscriptionDrawer';
import { SubscriptionsList } from './list/SubscriptionsList';

type Props = {
  subscriptionId: string | null;
  planId: string | null;
};

export const SubscriptionsContainer: FC<Props> = ({ subscriptionId, planId }) => {
  const router = useNavigate();
  const { subscriptionSummaries, targetSubscription, setSubscriptionId } = useSubscription();

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
  const handleAddSubscription = (
    _targetSubscriptionParam: SubscriptionType,
    _planId: string
  ): Promise<void> => {
    /**
     * TODO: CRUD生え次第変更
     */
    controlDrawerClose();
    onOpenSnackBar();
    setTimeout(() => {
      router('/');
    }, 3000);
    return new Promise((resolve) => resolve());
  };

  /**
   * subscriptionIdがある場合には、fetchしてdrawerを開く
   */
  useEffect(() => {
    if (!subscriptionId) return;
    onSubscriptionClick(subscriptionId);
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
