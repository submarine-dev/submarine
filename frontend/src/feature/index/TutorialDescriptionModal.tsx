import CheckIcon from '@mui/icons-material/Check';
import { Alert, Popover, Stack } from '@mui/material';
import { FC } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
};

export const TutorialDescriptionModal: FC<Props> = ({ open, onClose, anchorEl }) => {
  return (
    <>
      <Popover open={open} onClose={onClose} sx={{ top: 60 }} anchorEl={anchorEl}>
        <Stack sx={{ position: 'relative', zIndex: 3 }}>
          <Alert icon={<CheckIcon fontSize="inherit" sx={{ pr: 1 }} />} severity="success">
            <span style={{ fontWeight: 'bold' }}>現在はデモモードです。</span>
            <br />
            右上のメニューの「Submarineに登録する」をクリックすると、実際にSubmarineを利用することができます。
          </Alert>
        </Stack>
      </Popover>
      {open ? (
        <Stack
          sx={{
            width: '100dvw',
            height: '100dvh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={onClose}
        />
      ) : null}
    </>
  );
};
