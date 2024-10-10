import { BoardWrapper } from '@/components/BoardWrapper';
import { BodyTypo } from '@/components/Typography';
import { ContractedSubscriptionType } from '@/types/ContractedSubscriptionType';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

type Props = {
  targetSubscription: ContractedSubscriptionType;
  editMenus: {
    id: string;
    icon: ReactNode;
    onClick: () => void;
  }[];
};

/**
 * サブスクリプションの詳細を表示するボード
 */
export const SubscriptionDetailBoard: FC<Props> = ({
  targetSubscription,
  editMenus,
}) => {
  return (
    <BoardWrapper>
      <div className="space-y-4 py-2">
        <div className="flex justify-center">
          <div className="flex justify-center items-center aspect-square w-16 h-16 bg-gray-100 rounded-full">
            <Image
              src={targetSubscription.icon}
              alt={targetSubscription.subscriptionName}
              width={40}
              height={40}
              className="rounded-full aspect-square"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <BodyTypo>
            {targetSubscription.subscriptionName}
          </BodyTypo>
        </div>
        <div className="flex justify-center space-x-4">
          {editMenus.map((menu) => {
            return (
              <button
                key={menu.id}
                onClick={menu.onClick}
                type="button"
                className="p-2 bg-gray-100 rounded-full"
              >
                {menu.icon}
              </button>
            );
          })}
        </div>
      </div>
    </BoardWrapper>
  );
};
