import { Body2Typo } from '@/components/Typography';
import { axiosFn } from '@/lib/axiosFn';
import { ContractedSubscriptionType } from '@/types/ContractedSubscriptionType';
import { SubscriptionBaseType } from '@/types/SubscriptionBaseType';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddSubscriptionBoard } from './AddSubscriptionBoard';
import { SubscribedBoard } from './SubscribedBoard';

/**
 * ログイントップ/content
 */
const HomeContent: FC = () => {
  const router = useNavigate();
  const [totalPayment, setTotalPayment] =
    useState<number>(0);
  const [
    contractedSubscriptions,
    setContractedSubscriptions,
  ] = useState<ContractedSubscriptionType[]>([]);
  const [listOfSubscriptions, setListOfSubscriptions] =
    useState<SubscriptionBaseType[]>([]);

  /**
   * サブスクのクリック
   *
   * @param subscriptionId サブスクID
   */
  const handleClickSubscription = (
    subscriptionId: string
  ): void => {
    router(`/detail/${subscriptionId}`);
  };

  /**
   * 初期ロード
   * - ユーザの情報（契約しているサブスク・支払額）を取得
   * - サブスクの一覧取得
   */
  useEffect(() => {
    (async () => {
      const userRes = await axiosFn.get(
        '/users/1/subscriptions'
      );
      const subscriptionsRes = await axiosFn.get(
        '/subscriptions'
      );

      const newUserData = userRes.data.data;
      const newSubscriptions =
        subscriptionsRes.data.subscriptionMaster;

      setTotalPayment(newUserData.totalPayment);
      setContractedSubscriptions(newUserData.subscriptions);
      setListOfSubscriptions(newSubscriptions);
    })();
  }, []);

  return (
    <div className="space-y-3">
      <SubscribedBoard
        totalPayment={totalPayment}
        contractedSubscriptions={contractedSubscriptions}
        handleSelectSubscription={handleClickSubscription}
      />
      <div className="space-y-2">
        <Body2Typo>サブスクを追加</Body2Typo>
        <AddSubscriptionBoard
          listOfSubscriptions={listOfSubscriptions}
        />
      </div>
    </div>
  );
};

export default HomeContent;
