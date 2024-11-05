import { SquareCard } from '@/components/card/SquareCard';
import { SubscriptionSummaryType } from '@/types/domain/SubscriptionType';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';

type Props = {
  subscriptionSummaries: SubscriptionSummaryType[];
  onSubscriptionClick: (subscriptionId: string) => void;
};

export const AddSubscriptionRecommend: FC<Props> = ({
  subscriptionSummaries,
  onSubscriptionClick,
}) => {
  const subscriptionItems = subscriptionSummaries
    .map((subscription) => {
      return {
        id: subscription.id,
        title: subscription.name ?? '',
        icon: subscription.icon ?? '',
      };
    })
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          position: 'absolute',
          overflowX: 'auto',
          zIndex: 2,
          pointerEvents: 'auto',
          width: 'calc(100% - 16px)',
          height: 100,
          maxWidth: 'sm',
        }}
      >
        {subscriptionItems.map((item) => (
          <SquareCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            onClick={() => onSubscriptionClick(item.id ?? '')}
          />
        ))}
      </Stack>
      <Box
        /**
         * カードの高さ分のスペーサー
         */
        sx={{ height: 90 }}
      />
    </>
  );
};
