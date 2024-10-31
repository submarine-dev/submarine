import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthCallbackPage: FC = () => {
  const router = useNavigate();

  const handleClickRedirectIndex = (): void => {
    router('/');
  };

  return (
    <Stack
      sx={{
        height: '100dvh',
        width: '100%',
        background: 'linear-gradient(0deg, #0B1C31 0%, #2850BF 100%)',
      }}
    >
      <Stack
        spacing={5}
        sx={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography color="white" variant="h6">
          認証に成功しました。
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography variant="body2" color="white">
            自動的にリダイレクトされない場合は
          </Typography>
          <Button
            onClick={handleClickRedirectIndex}
            variant="text"
            sx={{
              color: 'white',
              textDecoration: 'underline',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <Typography variant="body2">ホームに戻る</Typography>
          </Button>
          <Typography variant="body2" color="white">
            をクリック。
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
