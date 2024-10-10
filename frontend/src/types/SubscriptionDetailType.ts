import { SubscriptionBaseType } from './SubscriptionBaseType';
import { SubscriptionPlanType } from './SubscriptionPlanType';

/**
 * サブスクリプションの詳細な型
 */
export type SubscriptionDetailType =
  SubscriptionBaseType & {
    unsubscribeLink: string;
    plans: SubscriptionPlanType[];
  };
