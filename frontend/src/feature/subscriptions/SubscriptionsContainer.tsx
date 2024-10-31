import useDiscloser from '@/hooks/common/useDiscloser';
import { FC, useEffect, useState } from 'react';
import { AddSubscriptionDrawer } from './drawer/AddSubscriptionDrawer';
import { SubscriptionType } from '@/types/domain/SubscriptionType';
import { subscriptionService } from '@/service/subscriptionService';
import { useProductMode } from '@/store/useProductMode';

type Props = {
  subscriptionId: string | null;
};

export const SubscriptionsContainer: FC<Props> = ({ subscriptionId }) => {
  const { productMode } = useProductMode();
  const [isOpenControlDrawer, controlDrawerOpen, controlDrawerClose] = useDiscloser();
  const [targetSubscription, setTargetSubscription] = useState<SubscriptionType | null>(null);

  /**
   * subscriptionIdがある場合には、fetchしてdrawerを開く
   */
  useEffect(() => {
    if (!subscriptionId) return;
    controlDrawerOpen();
    (async () => {
      const res = await subscriptionService.get({ productMode, subscriptionId });
      if (!res) return;

      setTargetSubscription(res);
    })();
  }, [subscriptionId]);

  return (
    <>
      SubscriptionsContainer
      {targetSubscription ? (
        <AddSubscriptionDrawer
          open={isOpenControlDrawer}
          onClose={controlDrawerClose}
          subscription={targetSubscription}
        />
      ) : null}
    </>
  );
};
