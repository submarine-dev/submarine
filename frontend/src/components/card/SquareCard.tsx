import { getTextColor } from '@/utils/getTextColor';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  title: string;
  icon: string | ReactNode;
  bgcolor: string;
  size?: number;
  onClick: () => void;
};

export const SquareCard: FC<Props> = ({ title, icon, bgcolor, size = 90, onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        height: size,
        width: size,
        minWidth: size,
        minHeight: size,
        padding: 1,
        bgcolor,
        '&:hover': {
          bgcolor,
          opacity: 0.8,
        },
      }}
    >
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Stack justifyContent="center" sx={{ height: '2rem' }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 'bold',
              color: getTextColor(bgcolor) ? 'black' : 'white',
              lineHeight: '1rem',
            }}
          >
            {title}
          </Typography>
        </Stack>
        {typeof icon === 'string' ? (
          <Avatar
            src={icon}
            sx={{
              width: 30,
              height: 30,
            }}
          />
        ) : (
          icon
        )}
      </Stack>
    </Button>
  );
};
