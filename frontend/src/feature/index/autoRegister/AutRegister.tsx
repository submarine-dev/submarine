import { CardLayout } from '@/components/card/CardLayout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const AutoRegister: FC = () => {
  return (
    <CardLayout>
      <Stack spacing={2}>
        <Typography variant="body2" color="gray">
          未確認:0件
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <CheckCircleIcon color="success" />
          <Typography>確認が必要な項目はありません</Typography>
        </Stack>
      </Stack>
    </CardLayout>
  );
};
