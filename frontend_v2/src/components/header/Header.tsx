import { Avatar, Button, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const Header: FC = () => {
  const router = useNavigate();
  // const {user:{} } = useAuth();

  const handleBackHome = (): void => {
    router('/');
  };

  const handleClickProfile = (): void => {
    router('/profile');
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 2 }}>
      <div />
      <Button onClick={handleBackHome} variant="text">
        <Typography variant="h5" color="white">
          Submarine
        </Typography>
      </Button>
      <Stack onClick={handleClickProfile} alignItems="flex-end">
        <Avatar
          src="https://cdn-ak.f.st-hatena.com/images/fotolife/n/nsmr_jx/20220902/20220902153856.png"
          alt=""
        />
      </Stack>
    </Stack>
  );
};
