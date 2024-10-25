import { createTheme } from '@mui/material';
import breakpoints from './breakpoints';
import { palette } from './paletteFn.ts';
import typography from './typography';

export const theme = createTheme({
  shape: {
    borderRadius: 10,
  },
  palette,
  breakpoints,
  typography,
});
