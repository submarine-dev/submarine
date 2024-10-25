import { Button, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import OauthPopup from 'react-oauth-popup';
import { useHandleAuth } from './hooks/useHandleAuth';

export const AuthContainer: FC = () => {
  const { authUrl, handleCatchAuthCode } = useHandleAuth();

  return (
    <Stack
      sx={{
        height: '100dvh',
        width: '100%',
        background: 'linear-gradient(0deg, #0B1C31 0%, #2850BF 100%)',
      }}
    >
      <Stack
        spacing={10}
        sx={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack alignItems="center" spacing={1}>
          <img src="/images/icon/submarine_icon.png" alt="submarine" height={50} />
          <Typography variant="h4" sx={{ color: 'white', pt: 0.8, fontWeight: 'bold' }}>
            Submarine
          </Typography>
        </Stack>
        <OauthPopup
          title="Login with Google"
          width={600}
          height={600}
          url={authUrl}
          onCode={handleCatchAuthCode}
          // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
          onClose={() => {}}
        >
          <Button variant="contained">
            <Typography>Googleでログイン</Typography>
          </Button>
        </OauthPopup>
      </Stack>
    </Stack>
  );
};
