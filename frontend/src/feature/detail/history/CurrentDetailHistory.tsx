import { PaymentType } from '@/types/domain/PaymentEnum';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { HistoryList } from './HistoryList';

type Props = {
  history: {
    planName: string;
    paymentType: PaymentType;
    price: number;
    paidAt: string;
  };
};

export const CurrentDetailHistory: FC<Props> = ({ history }) => {
  return (
    <Stack spacing={1}>
      <Typography variant="body2" color="gray">
        契約中
      </Typography>
      <HistoryList histories={[history]} />
    </Stack>
  );
};
