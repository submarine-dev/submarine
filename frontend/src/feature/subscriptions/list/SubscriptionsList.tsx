import { SquareCard } from '@/components/card/SquareCard';
import { SubscriptionSummaryType } from '@/types/domain/SubscriptionType';
import { Grid, Stack } from '@mui/material';
import { FC } from 'react';

type Props = {
  subscriptions: SubscriptionSummaryType[];
  onSubscriptionClick: (subscriptionId: string) => void;
};

export const SubscriptionsList: FC<Props> = ({ subscriptions, onSubscriptionClick }) => {
  return (
    <Stack sx={{ alignItems: 'center' }}>
      <Grid container columns={12} rowSpacing={1} columnSpacing={1}>
        {subscriptions.map((subscription) => (
          <Grid item key={subscription.id} xs={2}>
            <SquareCard
              key={subscription.id}
              title={subscription.name ?? ''}
              icon={subscription.icon}
              onClick={() => onSubscriptionClick(subscription.id ?? '')}
              size="auto"
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
