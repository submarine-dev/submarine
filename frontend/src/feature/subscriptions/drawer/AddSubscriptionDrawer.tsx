import { ControlDrawer } from '@/components/drawer/ControlDrawer';
import useDiscloser from '@/hooks/common/useDiscloser';
import { SubscriptionType } from '@/types/domain/SubscriptionType';
import { Alert, Button, Snackbar, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  open: boolean;
  onClose: () => void;
  subscription: SubscriptionType;
  onAddSubscription: () => Promise<void>;
};

export const AddSubscriptionDrawer: FC<Props> = ({ open, onClose, subscription }) => {
  const router = useNavigate();

  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isOpenSnackBar, onOpenSnackBar, onCloseSnackBar] = useDiscloser();

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

  /**
   * 選択のsubmit
   */
  const handleSubmit = (): void => {
    /**
     * TODO: サブスクリプションの追加処理
     */
    onOpenSnackBar();
    onClose();
    setTimeout(() => {
      router('/');
    }, 3000);
  };

  return (
    <>
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
            <Button
              onClick={handleSubmit}
              disabled={selectedPlanId === null}
              variant="contained"
              sx={{ width: '120px' }}
            >
              追加する
            </Button>
          </Stack>
        </Stack>
      </ControlDrawer>
      <Snackbar open={isOpenSnackBar} onClose={onCloseSnackBar} autoHideDuration={3000}>
        <Alert onClose={onCloseSnackBar} severity="success" variant="filled" sx={{ width: '100%' }}>
          サブスクリプションを追加しました
        </Alert>
      </Snackbar>
    </>
  );
};
