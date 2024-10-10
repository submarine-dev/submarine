import { BoardWrapper } from '@/components/BoardWrapper';
import { BodyTypo, H1 } from '@/components/Typography';
import { ContractedSubscriptionType } from '@/types/ContractedSubscriptionType';
import { FC } from 'react';
import { ContractedSubscriptionsRow } from './SubscribedBoard/ContractedSubscriptionsRow';
import { addCommasToNumber } from '@/util/addCommasToNumber';

type Props = {
  totalPayment: number;
  contractedSubscriptions: ContractedSubscriptionType[];
  handleSelectSubscription: (
    subscriptionId: string
  ) => void;
};

/**
 * 登録されているサブスクと総額を表示するボード
 */
export const SubscribedBoard: FC<Props> = ({
  totalPayment,
  contractedSubscriptions,
  handleSelectSubscription,
}) => {
  return (
    <BoardWrapper>
      <div className="space-y-5">
        <div className="space-y-1">
          <BodyTypo>今月のお支払い</BodyTypo>
          <H1>{addCommasToNumber(totalPayment)}円</H1>
        </div>
        <div>
          {contractedSubscriptions.map(
            (contractedSubscription) => (
              <ContractedSubscriptionsRow
                key={contractedSubscription.subscriptionId}
                contractedSubscription={
                  contractedSubscription
                }
                handleSelectSubscription={
                  handleSelectSubscription
                }
              />
            )
          )}
        </div>
      </div>
    </BoardWrapper>
  );
};
