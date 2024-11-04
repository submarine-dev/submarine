import { SubscriptionDrawerBase } from '@/components/drawer/SubscriptionDrawerBase';
import { PlanType } from '@/types/domain/SubscriptionType';
import { Alert, Snackbar } from '@mui/material';
import { FC } from 'react';

type Props = {
  open: boolean;
  subscription: {
    icon: string;
    name: string;
  };
  plans: PlanType[] | undefined;
  selectedPlanId: string | null;
  isOpenSnackBar: boolean;
  onClickPlan: (planId: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  onCloseSnackBar: () => void;
};

export const EditSubscriptionDrawer: FC<Props> = ({
  open,
  subscription,
  plans,
  selectedPlanId,
  isOpenSnackBar,
  onClickPlan,
  onCancel,
  onSubmit,
  onCloseSnackBar,
}) => {
  return (
    <>
      <SubscriptionDrawerBase
        open={open}
        title="登録中のサブスクリプションを編集"
        submitText="更新する"
        subscription={subscription}
        plans={plans ?? []}
        selectedPlanId={selectedPlanId}
        onClickPlan={onClickPlan}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
      <Snackbar open={isOpenSnackBar} onClose={onCloseSnackBar} autoHideDuration={3000}>
        <Alert onClose={onCloseSnackBar} severity="success" variant="filled" sx={{ width: '100%' }}>
          サブスクリプションを更新しました
        </Alert>
      </Snackbar>
    </>
  );
};
