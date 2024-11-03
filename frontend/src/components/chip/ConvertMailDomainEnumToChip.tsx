import { MailDomainEnum } from '@/types/domain/MailDomainEnum';
import { Chip } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  mailDomain: MailDomainEnum;
  size?: 'small' | 'medium';
  connectText?: string;
};

export const ConvertMailDomainEnumToChip: FC<Props> = ({
  mailDomain,
  size = 'small',
  connectText = '',
}): ReactNode => {
  switch (mailDomain) {
    case MailDomainEnum.GMAIL:
      return <Chip label={`Gmail${connectText}`} size={size} />;
  }
};
