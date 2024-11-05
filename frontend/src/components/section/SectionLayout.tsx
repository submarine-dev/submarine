import { theme } from '@/theme/theme';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Stack, SxProps, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { FC, ReactNode, useState } from 'react';

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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

  return (
    <Stack sx={{ width: '100%', pb: 3, ...sx }} spacing={1}>
      {sectionTitle || helpText ? (
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
          {sectionTitle ? <Typography color={titleColor}>{sectionTitle}</Typography> : null}
          {helpText ? (
            isSmallScreen ? (
              <Tooltip
                title={helpText}
                open={tooltipIsOpen}
                onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
              >
                <HelpOutlineIcon fontSize="small" sx={{ color: titleColor }} />
              </Tooltip>
            ) : (
              <Tooltip title={helpText}>
                <HelpOutlineIcon fontSize="small" sx={{ color: titleColor }} />
              </Tooltip>
            )
          ) : null}
        </Stack>
      ) : null}
      <div>{children}</div>
    </Stack>
  );
};
