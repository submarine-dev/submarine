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
  }[];
};

export const ProfileMenu: FC<Props> = ({ anchorEl, open, onClose, menuItem }) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {menuItem.map((item) => (
        <MenuItem key={item.label} onClick={item.onClick}>
          <Stack direction="row" spacing={0.5}>
            <div>{item.icon}</div>
            <Typography>{item.label}</Typography>
          </Stack>
        </MenuItem>
      ))}
    </Menu>
  );
};
