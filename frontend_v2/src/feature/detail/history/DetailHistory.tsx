import { PaymentType } from '@/types/domain/PaymentEnum';
import { ConvertPaymentEnumToChip } from '@/components/chip/ConvertPaymentEnumToChip';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  planName: string;
  paymentType: PaymentType;
  price: number;
  paidAt: string;
};

export const DetailHistory: FC<Props> = ({ planName, paymentType, price, paidAt }) => {
  return (
    <Stack spacing={1}>
      <Typography variant="body2" color="gray">
        契約中
      </Typography>
      <Stack spacing={1} sx={{ border: '0.5px solid gray', borderRadius: '10px', p: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2">{planName}</Typography>
            <ConvertPaymentEnumToChip payment={paymentType} />
          </Stack>
          <Typography variant="body2">{price.toLocaleString()}円</Typography>
        </Stack>
        <Typography variant="body2">次の課金日: {paidAt}</Typography>
      </Stack>
    </Stack>
  );
};
