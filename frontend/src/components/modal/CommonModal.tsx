import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  children: ReactNode;
  title: string;
  cancelLabel?: string;
  submitLabel?: string;
};

export const CommonModal: FC<Props> = ({
  open,
  onCancel,
  onSubmit,
  children,
  title,
  cancelLabel = 'キャンセル',
  submitLabel = '保存',
}) => {
  return (
    <Dialog onClose={onCancel} open={open}>
      <DialogTitle sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Typography>{title}</Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{ pb: 2.5 }}>
        <Stack direction="row" justifyContent="center" width="100%" spacing={2}>
          <Button variant="outlined" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="contained" onClick={onSubmit}>
            {submitLabel}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
