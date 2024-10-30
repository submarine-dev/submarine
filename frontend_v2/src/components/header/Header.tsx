import { useAuth } from '@/store/useAuth';
import { Avatar, Button, IconButton, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const Header: FC = () => {
  const { pathname } = useLocation();
  const router = useNavigate();
  const { user } = useAuth();

  const isHiddenBackButton = pathname === '/';

  const handleBack = (): void => {
    router(-1);
  };

  const handleBackHome = (): void => {
    router('/');
  };

  const handleClickProfile = (): void => {
    router('/profile');
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        py: 2,
        /* ヘッダーの操作系を微妙に内側に寄せるための余白 */
        px: 0.5,
      }}
    >
      <IconButton
        onClick={handleBack}
        disabled={isHiddenBackButton}
        sx={{ opacity: isHiddenBackButton ? 0 : 1 }}
      >
        <KeyboardBackspaceIcon fontSize="medium" sx={{ color: 'white' }} />
      </IconButton>
      <Button onClick={handleBackHome} variant="text">
        <Typography variant="h5" color="white" sx={{ fontWeight: 'bold' }}>
          Submarine
        </Typography>
      </Button>
      <Stack onClick={handleClickProfile} alignItems="flex-end">
        <Avatar src={user.icon} alt={user.userId} />
      </Stack>
    </Stack>
  );
};
