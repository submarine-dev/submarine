import { css } from '@emotion/react';
import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  root: css({
    height: '100dvh',
    width: '100dvw',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  }),
  text: css({
    textAlign: 'center',
  }),
};

export const NotFoundPage: FC = () => {
  const router = useNavigate();

  const handleBackHomeClick = (): void => {
    router('/');
  };

  return (
    <Stack css={styles.root}>
      <Typography variant="h6" css={styles.text}>
        指定されたページは存在しません
      </Typography>
      <Button onClick={handleBackHomeClick} variant="outlined">
        トップに戻る
      </Button>
    </Stack>
  );
};
