import { SubscriptionDrawerBase } from '@/components/drawer/SubscriptionDrawerBase';
import { SubscriptionType } from '@/types/domain/SubscriptionType';
import { FC, useEffect, useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  subscription: SubscriptionType;
  paramPlanId: string | null;
  onAddSubscription: (planId: string) => Promise<void>;
};

export const AddSubscriptionDrawer: FC<Props> = ({
  open,
  onClose,
  subscription,
  paramPlanId,
  onAddSubscription,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  /**
   * クエリパラメータにplanIdがある場合には、選択されたプランをセットする
   */
  useEffect(() => {
    if (!paramPlanId) return;
    setSelectedPlanId(paramPlanId);
  }, [paramPlanId]);

  if (!subscription.plan) return null;
  const plans = subscription.plan.map((plan) => ({
    id: plan.id ?? '',
    name: plan.name ?? '',
    paymentType: plan.paymentType ?? 'monthly',
    price: plan.price ?? 0,
    subscriptionId: subscription.id ?? '',
  }));

  /**
   * 選択されているプランの変更
   * @param planId
   */
  const handleClickPlan = (planId: string): void => {
    setSelectedPlanId(planId);
  };

  /**
   * キャンセルボタン
   */
  const handleCancel = (): void => {
    setSelectedPlanId(null);
    onClose();
  };

  /**
   * 選択のsubmit
   */
  const handleSubmit = async (): Promise<void> => {
    /**
     * TODO: サブスクリプションの追加処理
     */
    await onAddSubscription(selectedPlanId ?? '');
  };

  return (
    <SubscriptionDrawerBase
      open={open}
      title="新しいサブスクリプションを追加"
      subscription={{
        icon: subscription.icon ?? '',
        name: subscription.name ?? '',
      }}
      plans={plans}
      selectedPlanId={selectedPlanId}
      onClickPlan={handleClickPlan}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
};
