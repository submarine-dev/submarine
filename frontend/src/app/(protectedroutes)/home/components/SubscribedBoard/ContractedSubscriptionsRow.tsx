import {
  Body2Typo,
  BodyTypo,
} from '@/components/Typography';
import { ContractedSubscriptionType } from '@/types/ContractedSubscriptionType';
import { addCommasToNumber } from '@/util/addCommasToNumber';
import Image from 'next/image';
import { FC } from 'react';

type Props = {
  contractedSubscription: ContractedSubscriptionType;
  handleSelectSubscription: (
    subscriptionId: string
  ) => void;
};

/**
 * 契約済みのサブスクを表示するRow
 */
export const ContractedSubscriptionsRow: FC<Props> = ({
  contractedSubscription,
  handleSelectSubscription,
}) => {
  return (
    <button
      onClick={() =>
        handleSelectSubscription(
          contractedSubscription.subscriptionId
        )
      }
      type="button"
      className="w-full"
    >
      <div className="p-2 border-t-2 border-gray-100">
        <div className="grid grid-cols-12">
          <div className="col-span-2 rounded-full bg-gray-100 aspect-square w-8 h-8 flex justify-center items-center">
            <Image
              src={contractedSubscription.icon}
              alt={contractedSubscription.subscriptionName}
              width={20}
              height={20}
            />
          </div>
          <div className="col-span-8 pt-1 space-y-2 text-left">
            <BodyTypo>
              {contractedSubscription.subscriptionName}
            </BodyTypo>
            <Body2Typo>
              {contractedSubscription.plan}
            </Body2Typo>
          </div>
          <div className="col-span-2 pt-1">
            <BodyTypo>
              {addCommasToNumber(
                contractedSubscription.monthlyPrice
              )}
              円
            </BodyTypo>
          </div>
        </div>
      </div>
    </button>
  );
};
