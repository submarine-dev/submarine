import { PaymentType } from '@/types/domain/PaymentEnum';
import { Chip } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  payment: PaymentType;
};

export const ConvertPaymentEnumToChip: FC<Props> = ({ payment }): ReactNode => {
  switch (payment) {
    case 'daily':
      return <Chip label="日単位" size="small" />;
    case 'monthly':
      return <Chip label="月単位" size="small" />;
    case 'yearly':
      return <Chip label="年単位" size="small" />;
    default:
      return <Chip label="その他" size="small" />;
  }
};
