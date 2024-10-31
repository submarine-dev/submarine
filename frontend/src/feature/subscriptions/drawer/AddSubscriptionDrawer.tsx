import { ControlDrawer } from '@/components/drawer/ControlDrawer';
import { SubscriptionType } from '@/types/domain/SubscriptionType';
import { Button, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  subscription: SubscriptionType;
  onAddSubscription: () => Promise<void>;
};

export const AddSubscriptionDrawer: FC<Props> = ({ open, onClose, subscription }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  if (!subscription.plan) return null;
  const planItems = subscription.plan.map((plan) => {
    return {
      id: plan.id,
      label: plan.name,
      price: plan.price,
      onCLick: () => handleClickPlan(plan.id ?? ''),
    };
  });

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

  return (
    <ControlDrawer
      open={open}
      onClose={onClose}
      title="新しいサブスクリプションをを追加"
      subscription={{ icon: subscription.icon ?? '', name: subscription.name ?? '' }}
    >
      <Stack spacing={3}>
        <Stack spacing={1} sx={{ pt: 1 }}>
          {planItems.map((plan) => {
            const selected = selectedPlanId === plan.id;
            return (
              <Button
                key={plan.id}
                variant={selected ? 'contained' : 'outlined'}
                onClick={plan.onCLick}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    p: 1,
                    py: 2,
                    color: selected ? 'white' : 'black',
                    width: '100%',
                  }}
                >
                  <Typography>{plan.label}</Typography>
                  <Typography>{plan.price?.toLocaleString()} 円</Typography>
                </Stack>
              </Button>
            );
          })}
        </Stack>
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ width: '100%' }}>
          <Button onClick={handleCancel} variant="outlined" sx={{ width: '120px' }}>
            キャンセル
          </Button>
          <Button variant="contained" sx={{ width: '120px' }}>
            追加する
          </Button>
        </Stack>
      </Stack>
    </ControlDrawer>
  );
};
