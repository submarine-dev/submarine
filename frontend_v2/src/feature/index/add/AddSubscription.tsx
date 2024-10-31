import { FC } from 'react';
import { SubscriptionSummaryType } from '@/types/domain/SubscriptionType';
import { SquareCard } from '@/components/card/SquareCard';
import { Box, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
  const subscriptionItems = subscriptionSummaries.map((subscription) => {
    return {
      id: subscription.id,
      title: subscription.name ?? '',
      icon: subscription.icon ?? '',
      /**
       * TODO: 色があった方がオシャレだと思ったこともありました
       */
      bgcolor: '#FFFFFF',
      // bgcolor: subscription.color ?? '#FFFFFF',
    };
  });

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          position: 'fixed',
          overflowX: 'auto',
          zIndex: 2,
          pointerEvents: 'auto',
          width: '100%',
          height: 100,
        }}
      >
        <SquareCard
          title="サブスク検索"
          icon={<SearchIcon sx={{ color: 'black' }} />}
          bgcolor="#FFFFFF"
          onClick={onFindSubscriptionClick}
        />
        {[...subscriptionItems].map((item) => (
          <SquareCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            bgcolor={item.bgcolor}
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
