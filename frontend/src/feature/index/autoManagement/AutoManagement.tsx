import { CardLayout } from '@/components/card/CardLayout';
import { AutoManagementSuggestSubscriptionType } from '@/types/domain/AutoManagementSuggestSubscriptionType';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  autoManagementSuggestSubscriptions: AutoManagementSuggestSubscriptionType[] | null | undefined;
};

export const AutoManagement: FC<Props> = ({ autoManagementSuggestSubscriptions }) => {
  const router = useNavigate();

  const unconfirmedCount = autoManagementSuggestSubscriptions?.length ?? 0;
  const isUnconfirmed = unconfirmedCount > 0;

  const handleCheckUnconfirmedClick = (): void => {
    router('/suggest');
  };

  return (
    <CardLayout>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Typography variant="body2" color={isUnconfirmed ? 'black' : 'gray'}>
            {`未確認：${unconfirmedCount}件`}
          </Typography>
          {isUnconfirmed ? (
            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              justifyContent="space-between"
              spacing={{ xs: 2, sm: 0 }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircleIcon color="warning" />
                <Typography>登録・変更・解約の候補があります</Typography>
              </Stack>
              <Button
                onClick={handleCheckUnconfirmedClick}
                variant="contained"
                endIcon={<ArrowCircleRightIcon />}
              >
                確認する
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center" spacing={1}>
              <CheckCircleIcon color="success" />
              <Typography>確認が必要な項目はありません</Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </CardLayout>
  );
};
