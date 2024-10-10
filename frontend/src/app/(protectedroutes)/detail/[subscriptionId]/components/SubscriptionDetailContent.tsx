'use client';

import { Body2Typo } from '@/components/Typography';
import { useAuth } from '@/components/functions/context/auth';
import { axiosFn } from '@/lib/axiosFn';
import { ContractedSubscriptionType } from '@/types/ContractedSubscriptionType';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { CgTrashEmpty } from 'react-icons/cg';
import { MdEdit } from 'react-icons/md';
import { SubscriptionDetailBoard } from './SubscriptionDetailBoard';
import { ContractedSubscriptionBoard } from './ContractedSubscriptionBoard';
import dayjs from 'dayjs';

type Props = {
  subscriptionId: string;
};

/**
 * サブスクリプション詳細/content
 */
const SubscriptionDetailContent: FC<Props> = ({
  subscriptionId,
}) => {
  const { fbUser } = useAuth();
  const [targetSubscription, setTargetSubscription] =
    useState<ContractedSubscriptionType | null>(null);

  /**
   * サブスクリプションの詳細取得
   */
  useEffect(() => {
    (async () => {
      const newTargetSubscriptionRes = await axiosFn.get(
        `/users/${fbUser?.uid}/subscriptions/${subscriptionId}`
      );
      setTargetSubscription(
        newTargetSubscriptionRes.data.data
      );
    })();
  }, [subscriptionId]);

  const editMenus = [
    {
      id: 'delete',
      icon: <CgTrashEmpty size="25px" />,
      onClick: () => {},
    },
    {
      id: 'edit',
      icon: <MdEdit size="25px" />,
      onClick: () => {},
    },
  ];

  const nextPaymentDate = (() => {
    const todayDate = dayjs();
    const paymentDateObj = dayjs(
      targetSubscription?.paymentDate ?? ''
    );

    if (paymentDateObj.isAfter(todayDate)) {
      return paymentDateObj
        .add(1, 'month')
        .format('YYYY-MM-DD');
    } else {
      return paymentDateObj.format('YYYY-MM-DD');
    }
  })();

  if (targetSubscription === null) return null;
  return (
    <div className="space-y-2">
      <SubscriptionDetailBoard
        targetSubscription={targetSubscription}
        editMenus={editMenus}
      />
      <Body2Typo>契約中</Body2Typo>
      <ContractedSubscriptionBoard
        plan={targetSubscription.plan}
        monthlyPrice={targetSubscription.monthlyPrice}
        nextPaymentDate={nextPaymentDate}
      />
    </div>
  );
};

export default SubscriptionDetailContent;
