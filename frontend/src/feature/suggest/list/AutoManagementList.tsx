import { ConvertMailDomainEnumToChip } from '@/components/chip/ConvertMailDomainEnumToChip';
import { ConvertPaymentEnumToChip } from '@/components/chip/ConvertPaymentEnumToChip';
import { ConvertSuggestEnumToChip } from '@/components/chip/ConvertSuggestEnumToChip';
import { AutoManagementSuggestSubscriptionType } from '@/types/domain/AutoManagementSuggestSubscriptionType';
import { CheckBox } from '@mui/icons-material';
import { Avatar, Grid, Stack, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  autoManagementSuggestSubscriptions: AutoManagementSuggestSubscriptionType[];
};

export const AutoManagementList: FC<Props> = ({ autoManagementSuggestSubscriptions }) => {
  return (
    <Stack spacing={0.5}>
      <Grid container columns={1}>
        <Grid item xs={1}>
          <Typography variant="caption" sx={{ pl: 0.5 }}>
            反映対象
          </Typography>
        </Grid>
      </Grid>
      {autoManagementSuggestSubscriptions.map(
        ({ id, icon, name, plan, suggestType, mailDomain }) => {
          return (
            <Stack key={id} sx={{ width: '100%', borderRadius: 0, borderTop: '1px solid #f0f0f0' }}>
              <Grid container columns={12} justifyContent="center" sx={{ py: 1 }}>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    pl: 2,
                  }}
                >
                  <CheckBox color="primary" />
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar src={icon} alt={name} sx={{ width: 40, height: 40 }} />
                </Grid>
                <Grid item xs={8}>
                  <Stack alignItems="flex-start" spacing={1}>
                    <Typography color="black">{name}</Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body2" color="gray">
                        {plan.name}
                      </Typography>
                      {plan.paymentType ? (
                        <ConvertPaymentEnumToChip payment={plan.paymentType} />
                      ) : null}
                      <ConvertMailDomainEnumToChip mailDomain={mailDomain} connectText="から取得" />
                      <ConvertSuggestEnumToChip suggestType={suggestType} color="primary" />
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          );
        }
      )}
    </Stack>
  );
};