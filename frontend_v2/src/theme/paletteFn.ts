import type { PaletteOptions } from '@mui/material';

export const PRIMARY_COLOR = '#2850BF';

/**
 * theme/palette
 */
export const palette: PaletteOptions = {
  primary: {
    main: PRIMARY_COLOR,
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#333333',
    contrastText: '#ffffff',
  },
  background: {
    default: PRIMARY_COLOR,
  },
};
