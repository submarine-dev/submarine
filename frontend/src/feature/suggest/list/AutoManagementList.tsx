import { ConvertMailDomainEnumToChip } from '@/components/chip/ConvertMailDomainEnumToChip';
import { ConvertPaymentEnumToChip } from '@/components/chip/ConvertPaymentEnumToChip';
import { ConvertSuggestEnumToChip } from '@/components/chip/ConvertSuggestEnumToChip';
import { theme } from '@/theme/theme';
import { AutoManagementSuggestSubscriptionType } from '@/types/domain/AutoManagementSuggestSubscriptionType';
import { CheckBox } from '@mui/icons-material';
import { Avatar, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { FC } from 'react';

type Props = {
  autoManagementSuggestSubscriptions: AutoManagementSuggestSubscriptionType[];
};

export const AutoManagementList: FC<Props> = ({ autoManagementSuggestSubscriptions }) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
                  <Typography color="black">{name}</Typography>
                  <Typography variant="body2" color="gray">
                    {plan.name}
                  </Typography>
                  <Grid container columns={12} spacing={1}>
                    <Grid item>
                      {plan.paymentType ? (
                        <ConvertPaymentEnumToChip payment={plan.paymentType} />
                      ) : null}
                    </Grid>
                    <Grid item>
                      <ConvertMailDomainEnumToChip
                        mailDomain={mailDomain}
                        connectText={isSmallScreen ? '' : 'から取得'}
                      />
                    </Grid>
                    <Grid item>
                      <ConvertSuggestEnumToChip suggestType={suggestType} color="primary" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Stack>
          );
        }
      )}
    </Stack>
  );
};
