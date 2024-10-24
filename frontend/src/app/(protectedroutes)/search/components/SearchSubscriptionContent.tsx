import { apiClient,  } from '@/lib/axiosFn';
import { ContractedSubscriptionType } from '@/types/ContractedSubscriptionType';
import { SubscriptionBaseType } from '@/types/SubscriptionBaseType';
import { FC, useEffect, useState } from 'react';
import { SearchSubscriptionBoard } from './SearchSubscriptionBoard';

/**
 * ログイントップ/content
 */
const SearchSubscriptionContent: FC = () => {
  const [
    ,
    // contractedSubscriptions
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
                const userSubscriptionRes = await apiClient.users._userId("").subscriptions.get();
                const subscriptionsRes = await apiClient.subscription.get();

                setContractedSubscriptions(userSubscriptionRes.body.userSubscriptions as any);
                setListOfSubscriptions(subscriptionsRes.body as any);
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
