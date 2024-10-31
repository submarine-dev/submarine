import { Avatar, Drawer, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subscription: {
    icon: string;
    name: string;
  };
  children: ReactNode;
};

export const ControlDrawer: FC<Props> = ({ open, onClose, title, subscription, children }) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      hideBackdrop
      sx={{
        /* 背景のブラックアウトを削除 */
        boxShadow: '0px -4px 4px rgba(0, 0, 0, 0.05)',
        '& .MuiDrawer-paper': {
          bgcolor: 'transparent',
          boxShadow: 'none',
        },
        /* 全体でイベントを一旦消して、中で復活させることで背景に対してもクリックを通す */
        pointerEvents: 'none',
      }}
    >
      <Stack
        spacing={1}
        sx={{
          bgcolor: 'white',
          borderRadius: 2,
          p: 3,
          /* イベント復活 */
          pointerEvents: 'auto',
        }}
      >
        <Stack
          spacing={2}
          sx={{
            pb: 2,
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <Typography variant="body2" color="gray">
            {title}
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
        {children}
      </Stack>
    </Drawer>
  );
};
