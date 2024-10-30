import { PaymentType } from '@/types/domain/PaymentEnum';

export const convertPaymentEnum = (payment: PaymentType): string => {
  switch (payment) {
    case 'daily':
      return '日単位';
    case 'monthly':
      return '月単位';
    case 'yearly':
      return '年単位';
    default:
      return 'その他';
  }
};
