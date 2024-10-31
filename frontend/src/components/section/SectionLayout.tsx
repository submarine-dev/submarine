import { Stack, SxProps, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  sectionTitle: string;
  children: ReactNode;
  sx?: SxProps;
};

export const SectionLayout: FC<Props> = ({ sectionTitle, children, sx }) => {
  return (
    <Stack sx={{ width: '100%', pt: 3, ...sx }} spacing={1}>
      <Typography color="gray">{sectionTitle}</Typography>
      <div>{children}</div>
    </Stack>
  );
};
