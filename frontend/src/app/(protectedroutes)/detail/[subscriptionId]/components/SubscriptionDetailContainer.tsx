import { FC } from 'react';
import SubscriptionDetailContent from './SubscriptionDetailContent';

type Props = {
  subscriptionId: string;
};

/**
 * サブスクリプション詳細/container
 */
const SubscriptionDetailContainer: FC<Props> = ({
  subscriptionId,
}) => {
  return (
    <SubscriptionDetailContent
      subscriptionId={subscriptionId}
    />
  );
};

export default SubscriptionDetailContainer;
