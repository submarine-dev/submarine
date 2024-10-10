import { NextPage } from 'next';
import SubscriptionDetailContainer from './components/SubscriptionDetailContainer';

type Props = {
  params: {
    subscriptionId: string;
  };
};

/**
 * サブスクリプション詳細
 */
const SubscriptionDetailPage: NextPage<Props> = ({
  params: { subscriptionId },
}) => {
  return (
    <SubscriptionDetailContainer
      subscriptionId={subscriptionId}
    />
  );
};

export default SubscriptionDetailPage;
