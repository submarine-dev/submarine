import { Menu, MenuItem, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  menuItem: {
    label: string;
    icon: ReactNode;
    onClick: () => void;
    isDisabled?: boolean;
  }[];
};

export const ProfileMenu: FC<Props> = ({ anchorEl, open, onClose, menuItem }) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {menuItem.map((item) => (
        <MenuItem key={item.label} onClick={item.onClick} disabled={item.isDisabled}>
          <Stack direction="row" spacing={1}>
            <div>{item.icon}</div>
            <Typography>{item.label}</Typography>
          </Stack>
        </MenuItem>
      ))}
    </Menu>
  );
};
