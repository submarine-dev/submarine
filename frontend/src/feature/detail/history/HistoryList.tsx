import { ConvertPaymentEnumToChip } from '@/components/chip/ConvertPaymentEnumToChip';
import { PaymentType } from '@/types/domain/PaymentEnum';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  histories: {
    planName: string;
    paymentType: PaymentType;
    price: number;
    paidAt: string;
  }[];
};

export const HistoryList: FC<Props> = ({ histories }) => {
  return (
    <Stack spacing={1}>
      {histories.map((item) => (
        <Stack
          key={item.paidAt}
          spacing={1}
          sx={{ border: '0.5px solid gray', borderRadius: '10px', p: 2 }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2">{item.planName}</Typography>
              <ConvertPaymentEnumToChip payment={item.paymentType} />
            </Stack>
            <Typography variant="body2">{item.price.toLocaleString()}円</Typography>
          </Stack>
          <Typography variant="body2">次の課金日: {item.paidAt}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};
