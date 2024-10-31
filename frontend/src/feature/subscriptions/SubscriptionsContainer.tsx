import useDiscloser from '@/hooks/common/useDiscloser';
import { FC, useEffect, useState } from 'react';
import { AddSubscriptionDrawer } from './drawer/AddSubscriptionDrawer';
import { SubscriptionType } from '@/types/domain/SubscriptionType';
import { subscriptionService } from '@/service/subscriptionService';
import { useProductMode } from '@/store/useProductMode';
import { SubscriptionsList } from './list/SubscriptionsList';
import { useSubscription } from '@/hooks/useSubscription';

type Props = {
  subscriptionId: string | null;
};

export const SubscriptionsContainer: FC<Props> = ({ subscriptionId }) => {
  const { productMode } = useProductMode();
  const { subscriptionSummaries } = useSubscription();
  const [isOpenControlDrawer, controlDrawerOpen, controlDrawerClose] = useDiscloser();
  const [targetSubscription, setTargetSubscription] = useState<SubscriptionType | null>(null);

  /**
   * サブスクが選択された時にサブスクをセットしてdrawerを開く
   */
  const onSubscriptionClick = (subscriptionId: string) => {
    (async () => {
      const res = await subscriptionService.get({ productMode, subscriptionId });
      if (!res) return;

      setTargetSubscription(res);
    })();
    controlDrawerOpen();
  };

  /**
   * 登録のハンドリング
   *
   * @param targetSubscriptionParam
   */
  const handleAddSubscription = (_targetSubscriptionParam: SubscriptionType): Promise<void> => {
    /**
     * TODO: CRUD生え次第変更
     */
    controlDrawerClose();
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
          onAddSubscription={() => handleAddSubscription(targetSubscription)}
        />
      ) : null}
    </>
  );
};
