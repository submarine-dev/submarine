import { DrawerBase } from '@/components/drawer/DrawerBase';
import { Alert, Avatar, Button, Snackbar, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

type Props = {
  open: boolean;
  subscription: {
    icon: string;
    name: string;
    unsubscribeLink: string;
  };
  isOpenSnackBar: boolean;
  onClose: () => void;
  onCancelSubmit: () => void;
  onCloseSnackBar: () => void;
};

export const CancelSubscriptionDrawer: FC<Props> = ({
  open,
  subscription,
  isOpenSnackBar,
  onClose,
  onCancelSubmit,
  onCloseSnackBar,
}) => {
  return (
    <>
      <DrawerBase open={open} onClose={onClose}>
        <Stack
          spacing={2}
          sx={{
            pb: 2,
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <Typography variant="body2" color="gray">
            サブスクリプションの解約
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              src={subscription.icon}
              alt={subscription.name}
              sx={{ width: 30, height: 30 }}
            />
            <Typography>{subscription.name}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={3} sx={{ py: 3 }}>
          <Stack spacing={1}>
            <Typography
              sx={{
                borderLeft: '4px solid #DDDDDD',
                pl: 1,
              }}
            >
              STEP１
            </Typography>
            <Typography variant="body2">
              以下のページから、{subscription.name}の解約を行ってください
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <OpenInNewIcon fontSize="small" sx={{ color: '#0070C0', pt: 0.3 }} />
              <Typography variant="body2">
                <Button
                  variant="text"
                  href={subscription.unsubscribeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ p: 0, color: '#0070C0' }}
                >
                  {subscription.name} を解約する
                </Button>
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={1} alignItems="flex-start">
            <Typography
              sx={{
                borderLeft: '4px solid #DDDDDD',
                pl: 1,
              }}
            >
              STEP２
            </Typography>
            <Typography variant="body2">
              解約が完了したら、サブスク自動管理から自動で解約が反映されます
            </Typography>
            <Typography variant="caption">以下のボタンから手動で削除することもできます</Typography>
            <Button onClick={onCancelSubmit} variant="outlined" size="small" color="inherit">
              {subscription.name} を削除する
            </Button>
          </Stack>
        </Stack>
        <Button onClick={onClose} variant="outlined">
          閉じる
        </Button>
      </DrawerBase>
      <Snackbar open={isOpenSnackBar} onClose={onCloseSnackBar} autoHideDuration={3000}>
        <Alert onClose={onCloseSnackBar} severity="success" variant="filled" sx={{ width: '100%' }}>
          サブスクリプションを削除しました
        </Alert>
      </Snackbar>
    </>
  );
};
