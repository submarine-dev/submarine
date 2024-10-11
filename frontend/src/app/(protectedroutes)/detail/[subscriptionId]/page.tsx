import { FC } from 'react';
import ProtectedRoutesLayout from '../../layout';
import SubscriptionDetailContainer from './components/SubscriptionDetailContainer';

type Props = {
  subscriptionId: string;
};

/**
 * サブスクリプション詳細
 */
const SubscriptionDetailPage: FC<Props> = ({
  subscriptionId,
}) => {
  return (
    <ProtectedRoutesLayout>
      <SubscriptionDetailContainer
        subscriptionId={subscriptionId}
      />
    </ProtectedRoutesLayout>
  );
};

export default SubscriptionDetailPage;
