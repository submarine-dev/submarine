import { Box, Container, Stack } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Header } from '../header/Header';

type Props = {
  children: ReactNode;
};

const Background: FC = () => {
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '40vh',
          zIndex: -1,
          background: 'linear-gradient(0deg, #0B1C31 0%, #2850BF 100%)',
          borderRadius: '0 0 2% 2%',
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          top: '40vh',
          left: 0,
          width: '100%',
          height: '60vh',
          zIndex: -1,
          bgcolor: '#F5F5F5',
        }}
      />
    </>
  );
};

export const PrimaryLayout: FC<Props> = ({ children }) => {
  return (
    <Stack sx={{ py: 1, px: 2 }}>
      <Container disableGutters maxWidth="sm">
        <Background />
        <Header />
        {children}
      </Container>
    </Stack>
  );
};
