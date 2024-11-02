import { theme } from '@/theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

/**
 * MUIのProvider
 */
export const MUIProvider: FC<Props> = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
