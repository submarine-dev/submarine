import { Delete } from '@mui/icons-material';
import { Edit } from '@mui/icons-material';
import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  icon: string;
  name: string;
  onDeleteClick: () => void;
  onEditClick: () => void;
};

export const DetailHeader: FC<Props> = ({ icon, name, onDeleteClick, onEditClick }) => {
  return (
    <Stack spacing={2} alignItems="center">
      <Avatar src={icon} sx={{ width: 70, height: 'auto' }} />
      <Typography variant="h6">{name}</Typography>
      <Stack direction="row" spacing={2}>
        <IconButton onClick={onEditClick}>
          <Edit />
        </IconButton>
        <IconButton onClick={onDeleteClick}>
          <Delete />
        </IconButton>
      </Stack>
    </Stack>
  );
};
