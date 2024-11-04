import { FC } from 'react';
import { DrawerBase } from './DrawerBase';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { PlanType } from '@/types/domain/SubscriptionType';

type Props = {
  open: boolean;
  title: string;
  subscription: {
    icon: string;
    name: string;
  };
  plans: PlanType[];
  selectedPlanId: string | null;
  onClickPlan: (planId: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  submitText?: string;
  cancelText?: string;
};

export const SubscriptionDrawerBase: FC<Props> = ({
  open,
  title,
  subscription,
  plans,
  selectedPlanId,
  onClickPlan,
  onCancel,
  onSubmit,
  submitText = '追加する',
  cancelText = 'キャンセル',
}) => {
  return (
    <DrawerBase open={open} onClose={onCancel}>
      <Stack
        spacing={2}
        sx={{
          pb: 2,
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Typography variant="body2" color="gray">
          {title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar src={subscription.icon} alt={subscription.name} sx={{ width: 30, height: 30 }} />
          <Typography>{subscription.name}</Typography>
        </Stack>
      </Stack>
      <Stack spacing={3}>
        <Stack
          spacing={1}
          sx={{
            pt: 1,
            overflowY: 'auto',
            height: '300px',
          }}
        >
          {plans.map((plan) => {
            const selected = selectedPlanId === plan.id;
            return (
              <Button
                key={plan.id}
                variant={selected ? 'contained' : 'outlined'}
                onClick={() => onClickPlan(plan.id ?? '')}
                sx={{ minHeight: '70px' }}
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
                  <Typography>{plan.name}</Typography>
                  <Typography>{plan.price?.toLocaleString()} 円</Typography>
                </Stack>
              </Button>
            );
          })}
        </Stack>
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ width: '100%' }}>
          <Button onClick={onCancel} variant="outlined" sx={{ width: '120px' }}>
            {cancelText}
          </Button>
          <Button
            onClick={onSubmit}
            disabled={selectedPlanId === null}
            variant="contained"
            sx={{ width: '120px' }}
          >
            {submitText}
          </Button>
        </Stack>
      </Stack>
    </DrawerBase>
  );
};
