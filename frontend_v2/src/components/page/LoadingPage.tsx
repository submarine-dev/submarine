import { css } from '@emotion/react';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { FC } from 'react';

const styles = {
  root: css({
    height: '100dvh',
    width: '100dvw',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  }),
  text: css({
    textAlign: 'center',
  }),
};

export const LoadingPage: FC = () => {
  return (
    <Stack css={styles.root}>
      <Typography variant="h5" css={styles.text}>
        Loading...
      </Typography>
      <CircularProgress color="primary" />
    </Stack>
  );
};
