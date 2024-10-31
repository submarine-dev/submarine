import { createTheme } from '@mui/material';
import breakpoints from './breakpoints.ts';
import { palette } from './paletteFn.ts';
import typography from './typography.ts';

export const theme = createTheme({
  shape: {
    borderRadius: 10,
  },
  palette,
  breakpoints,
  typography,
});
