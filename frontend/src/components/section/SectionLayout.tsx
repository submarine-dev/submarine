import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Stack, SxProps, Tooltip, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  helpText?: string;
  sectionTitle?: string;
  sx?: SxProps;
  titleColor?: string;
};

export const SectionLayout: FC<Props> = ({
  sectionTitle,
  children,
  helpText,
  sx,
  titleColor = 'gray',
}) => {
  return (
    <Stack sx={{ width: '100%', pb: 3, ...sx }} spacing={1}>
      {sectionTitle || helpText ? (
        <Stack direction="row" alignItems="center" spacing={1}>
          {sectionTitle ? <Typography color={titleColor}>{sectionTitle}</Typography> : null}
          {helpText ? (
            <Tooltip title={helpText}>
              <HelpOutlineIcon fontSize="small" sx={{ color: titleColor }} />
            </Tooltip>
          ) : null}
        </Stack>
      ) : null}
      <div>{children}</div>
    </Stack>
  );
};
