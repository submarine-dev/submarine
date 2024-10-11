import { SubscriptionBaseType } from './SubscriptionBaseType';

/**
 * 契約されているサブスクリプションの情報
 */
export type ContractedSubscriptionType =
  SubscriptionBaseType & {
    plan: string;
    monthlyPrice: number;
    paymentDate: string;
    startedAt: string;
  };
