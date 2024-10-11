import { FC } from 'react';
import SubscriptionDetailContainer from './components/SubscriptionDetailContainer';

type Props = {
  params: {
    subscriptionId: string;
  };
};

/**
 * サブスクリプション詳細
 */
const SubscriptionDetailPage: FC<Props> = ({
  params: { subscriptionId },
}) => {
  return (
    <SubscriptionDetailContainer
      subscriptionId={subscriptionId}
    />
  );
};

export default SubscriptionDetailPage;
