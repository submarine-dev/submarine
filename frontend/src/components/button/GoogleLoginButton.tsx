import { Button, Stack } from '@mui/material';
import { FC } from 'react';
import { GoogleLoginButtonBase } from './GoogleLoginButtonBase';

type Props = {
  label?: string;
};

export const GoogleLoginButton: FC<Props> = ({ label = 'Googleでログイン' }) => {
  return (
    <div style={{ pointerEvents: 'none' }}>
      <GoogleLoginButtonBase>
        <Button
          variant="contained"
          startIcon={
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ bgcolor: 'white', borderRadius: '100%', p: 0.5 }}
            >
              <img src="/images/common/google_icon.svg" alt="google" height={20} />
            </Stack>
          }
          /**
           * TODO: 技育展対策でdisabled
           */
          disabled
          sx={{
            '&:disabled': {
              backgroundColor: 'gray',
              color: 'white',
              opacity: 0.5,
            },
          }}
        >
          {label}
        </Button>
      </GoogleLoginButtonBase>
    </div>
  );
};
