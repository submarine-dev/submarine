import { CardLayout } from '@/components/card/CardLayout';
import { PaymentType } from '@/types/domain/PaymentEnum';
import { ConvertPaymentEnumToChip } from '@/components/chip/ConvertPaymentEnumToChip';
import { Avatar, Button, Grid, Stack, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  currentMonthPayment: number;
  userSubscriptions: {
    id?: string;
    icon?: string;
    name?: string;
    planName?: string;
    paymentType?: PaymentType;
    price?: number;
  }[];
  onClickColumn: (subscriptionId: string) => void;
};

export const UserSubscriptionSummary: FC<Props> = ({
  currentMonthPayment,
  userSubscriptions,
  onClickColumn,
}) => {
  return (
    <CardLayout>
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="caption" color="gray">
            今月の支払い
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {currentMonthPayment.toLocaleString()} 円
          </Typography>
        </Stack>
        <Stack spacing={0}>
          {userSubscriptions.map(({ id, icon, name, planName, paymentType, price }) => (
            <Button
              key={id}
              onClick={() => {
                if (!id) return;
                onClickColumn(id);
              }}
              variant="text"
              sx={{ width: '100%', borderRadius: 0, borderTop: '1px solid #f0f0f0' }}
            >
              <Grid container columns={12} alignItems="flex-start" sx={{ py: 1 }}>
                <Grid item xs={2}>
                  <Avatar src={icon} alt={name} sx={{ width: 50, height: 50 }} />
                </Grid>
                <Grid item xs={7}>
                  <Stack alignItems="flex-start" spacing={1}>
                    <Typography color="black">{name}</Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body2" color="gray">
                        {planName}
                      </Typography>
                      {paymentType && <ConvertPaymentEnumToChip payment={paymentType} />}
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={3} color="black" sx={{ textAlign: 'end' }}>
                  {price ? <Typography>{price.toLocaleString()} 円</Typography> : null}
                </Grid>
              </Grid>
            </Button>
          ))}
        </Stack>
      </Stack>
    </CardLayout>
  );
};
