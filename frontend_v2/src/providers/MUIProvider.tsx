import { theme } from '@/theme/createThemeFn';
import { ThemeProvider } from '@mui/material';
import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

/**
 * MUIのProvider
 */
export const MUIProvider: FC<Props> = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
