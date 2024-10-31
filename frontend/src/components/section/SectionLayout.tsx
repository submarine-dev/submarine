import { Stack, SxProps, Tooltip, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

type Props = {
  sectionTitle: string;
  children: ReactNode;
  helpText?: string;
  sx?: SxProps;
};

export const SectionLayout: FC<Props> = ({ sectionTitle, children, helpText, sx }) => {
  return (
    <Stack sx={{ width: '100%', pt: 3, ...sx }} spacing={1}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography color="gray">{sectionTitle}</Typography>
        {helpText ? (
          <Tooltip title={helpText}>
            <HelpOutlineIcon fontSize="small" sx={{ color: 'gray' }} />
          </Tooltip>
        ) : null}
      </Stack>
      <div>{children}</div>
    </Stack>
  );
};
