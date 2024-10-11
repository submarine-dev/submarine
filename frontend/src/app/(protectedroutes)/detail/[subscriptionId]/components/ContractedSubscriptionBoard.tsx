import { BoardWrapper } from '@/components/BoardWrapper';
import {
  Body2Typo,
  BodyTypo,
} from '@/components/Typography';
import { addCommasToNumber } from '@/util/addCommasToNumber';
import { FC } from 'react';

type Props = {
  plan: string;
  monthlyPrice: number;
  nextPaymentDate: string;
};

/**
 * サブスクリプションの詳細を表示するボード
 */
export const ContractedSubscriptionBoard: FC<Props> = ({
  plan,
  monthlyPrice,
  nextPaymentDate,
}) => {
  return (
    <BoardWrapper>
      <div className="space-y-2">
        <div className="grid grid-cols-12">
          <div className="col-span-9">
            <BodyTypo>{plan}</BodyTypo>
          </div>
          <div className="col-span-3 flex justify-end">
            <BodyTypo>
              {addCommasToNumber(monthlyPrice)}円
            </BodyTypo>
          </div>
        </div>
        <div>
          <Body2Typo>
            次の課金日: {nextPaymentDate}
          </Body2Typo>
        </div>
      </div>
    </BoardWrapper>
  );
};
