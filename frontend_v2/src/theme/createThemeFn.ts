import { createTheme } from '@mui/material';
import breakpoints from './breakpoints';
import typography from './typography';
import { palette } from './paletteFn.ts';

export const theme = createTheme({
  shape: {
    borderRadius: 10,
  },
  palette,
  breakpoints,
  typography,
});
