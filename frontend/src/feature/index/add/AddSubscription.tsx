import { SquareCard } from '@/components/card/SquareCard';
import { SubscriptionSummaryType } from '@/types/domain/SubscriptionType';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';

type Props = {
  subscriptionSummaries: SubscriptionSummaryType[];
  onFindSubscriptionClick: () => void;
  onSubscriptionClick: (subscriptionId: string) => void;
};

export const AddSubscription: FC<Props> = ({
  subscriptionSummaries,
  onFindSubscriptionClick,
  onSubscriptionClick,
}) => {
  const subscriptionItems = subscriptionSummaries
    .map((subscription) => {
      return {
        id: subscription.id,
        title: subscription.name ?? '',
        icon: subscription.icon ?? '',
        /**
         * TODO: 色があった方がオシャレだと思ったこともありました
         */
        // bgcolor: subscription.color ?? '#FFFFFF',
      };
    })
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
          width: 'calc(100% - 20px)',
          height: 100,
          maxWidth: 'sm',
          px: 0.3,
        }}
      >
        <SquareCard
          title="サブスク検索"
          icon={<SearchIcon sx={{ color: 'black' }} />}
          bgcolor="#FFFFFF"
          onClick={onFindSubscriptionClick}
        />
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
