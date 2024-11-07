import { CardLayout } from '@/components/card/CardLayout';
import useDiscloser from '@/hooks/common/useDiscloser';
import { useUserData } from '@/hooks/useUserData';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Alert, Button, Snackbar, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutoManagementList } from './list/AutoManagementList';

export const SuggestPageContainer: FC = () => {
  const { autoManagementSuggestSubscriptions } = useUserData();
  const [isOpenSnackBar, onOpenSnackBar, onCloseSnackBar] = useDiscloser();

  const router = useNavigate();

  const unconfirmedCount = autoManagementSuggestSubscriptions?.length ?? 0;
  const isUnconfirmed = unconfirmedCount > 0;

  const handleBackHomeClick = (): void => {
    router('/');
  };

  const handleSubmit = (): void => {
    onOpenSnackBar();
    setTimeout(() => {
      router('/');
    }, 3000);
  };

  return (
    <>
      <CardLayout>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Typography variant="body2" color={isUnconfirmed ? 'black' : 'gray'}>
              {`未確認：${unconfirmedCount}件`}
            </Typography>
            {isUnconfirmed ? (
              <Stack alignItems="start" spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CheckCircleIcon color="warning" />
                  <Typography>登録・変更・解約の候補があります</Typography>
                </Stack>
              </Stack>
            ) : (
              <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CheckCircleIcon color="success" />
                  <Typography>確認が必要な項目はありません</Typography>
                </Stack>
                <Button
                  onClick={handleBackHomeClick}
                  variant="contained"
                  endIcon={<ArrowCircleRightIcon />}
                >
                  ホームに戻る
                </Button>
              </Stack>
            )}
          </Stack>
          {autoManagementSuggestSubscriptions ? (
            <AutoManagementList
              autoManagementSuggestSubscriptions={autoManagementSuggestSubscriptions}
            />
          ) : null}
          <Stack alignItems={{ sm: 'flex-end' }}>
            <Button onClick={handleSubmit} variant="contained">
              選択した項目を反映
            </Button>
          </Stack>
        </Stack>
      </CardLayout>
      <Snackbar open={isOpenSnackBar} onClose={onCloseSnackBar} autoHideDuration={3000}>
        <Alert onClose={onCloseSnackBar} severity="success" variant="filled" sx={{ width: '100%' }}>
          サブスクリプションに反映しました
        </Alert>
      </Snackbar>
    </>
  );
};
