import { Paper, SxProps } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  sx?: SxProps;
};

export const CardLayout: FC<Props> = ({ children, sx }) => {
  return <Paper sx={{ width: '100%', p: 3, mb: 1, ...sx }}>{children}</Paper>;
};
