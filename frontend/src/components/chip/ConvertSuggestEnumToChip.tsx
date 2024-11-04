import { SuggestTypeEnum } from '@/types/domain/SuggestTypeEnum';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { Chip } from '@mui/material';
import { FC } from 'react';

type Props = {
  suggestType: SuggestTypeEnum;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'default' | 'error' | 'warning' | 'info' | 'success';
  variant?: 'filled' | 'outlined';
};

export const ConvertSuggestEnumToChip: FC<Props> = ({
  suggestType,
  size = 'small',
  color = 'default',
  variant = 'outlined',
}) => {
  switch (suggestType) {
    case SuggestTypeEnum.REGISTER:
      return (
        <Chip
          label="登録"
          size={size}
          color={color}
          icon={<AddCircleOutlineIcon />}
          variant={variant}
          sx={{ px: 0.5 }}
        />
      );
    case SuggestTypeEnum.CHANGE:
      return (
        <Chip
          label="変更"
          size={size}
          color={color}
          icon={<EditIcon />}
          variant={variant}
          sx={{ px: 0.5 }}
        />
      );
    case SuggestTypeEnum.CANCEL:
      return (
        <Chip
          label="解約"
          size={size}
          color={color}
          icon={<CancelIcon />}
          variant={variant}
          sx={{ px: 0.5 }}
        />
      );
  }
};
