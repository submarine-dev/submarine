import { Container, Drawer, Stack } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const DrawerBase: FC<Props> = ({ open, onClose, children }) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
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
      <Container disableGutters maxWidth="sm">
        <Stack
          spacing={1}
          sx={{
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
            bgcolor: 'white',
            borderRadius: 1,
            p: { xs: 3, sm: 4 },
            /* イベント復活 */
            pointerEvents: 'auto',
          }}
        >
          {children}
        </Stack>
      </Container>
    </Drawer>
  );
};
