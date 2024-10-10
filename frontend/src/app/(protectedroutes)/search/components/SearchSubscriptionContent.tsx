'use client';

import { FC, useEffect, useState } from 'react';
import { SubscriptionBaseType } from '@/types/SubscriptionBaseType';
import { ContractedSubscriptionType } from '@/types/ContractedSubscriptionType';
import { axiosFn } from '@/lib/axiosFn';
import { SearchSubscriptionBoard } from './SearchSubscriptionBoard';

/**
 * ログイントップ/content
 */
const SearchSubscriptionContent: FC = () => {
  const [
    contractedSubscriptions,
    setContractedSubscriptions,
  ] = useState<ContractedSubscriptionType[]>([]);
  const [listOfSubscriptions, setListOfSubscriptions] =
    useState<SubscriptionBaseType[]>([]);

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

      setContractedSubscriptions(newUserData.subscriptions);
      setListOfSubscriptions(newSubscriptions);
    })();
  }, []);

  return (
    <div>
      <SearchSubscriptionBoard
        listOfSubscriptions={listOfSubscriptions}
      />
    </div>
  );
};

export default SearchSubscriptionContent;
