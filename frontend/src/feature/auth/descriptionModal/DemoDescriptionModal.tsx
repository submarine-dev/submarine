import { CommonModal } from '@/components/modal/CommonModal';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export const DemoDescriptionModal: FC<Props> = ({ open, onCancel, onSubmit }) => {
  return (
    <CommonModal
      open={open}
      onCancel={onCancel}
      onSubmit={onSubmit}
      title="デモモードについて"
      cancelLabel="キャンセル"
      submitLabel="開始する"
    >
      <Stack justifyContent="center" sx={{ pt: 2 }} spacing={1}>
        <Typography variant="body2">
          デモモードでは、サンプルのデータで
          <br />
          サブスクの管理を体験することができます
        </Typography>
        <Typography variant="caption" color="gray">
          ※データはリロードするとリセットされます
        </Typography>
      </Stack>
    </CommonModal>
  );
};
